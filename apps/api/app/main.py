import uuid
from fastapi import FastAPI, Depends, UploadFile, File, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import require_api_key
from app.core.rate_limit import limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.db.session import get_db, engine
from app.db.base import Base
from app.db.models import Conversation, Message

from app.rag.ingest import save_upload, ingest_file
from app.rag.chat import run_chat

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_ollama import ChatOllama, OllamaEmbeddings

app = FastAPI(title=settings.app_name)

app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request, exc):
    return JSONResponse(status_code=429, content={"detail": "Rate limit exceeded"})

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

def get_llm_and_embeddings():
    if settings.llm_provider == "openai":
        if not settings.openai_api_key:
            raise RuntimeError("OPENAI_API_KEY missing")
        llm = ChatOpenAI(model=settings.openai_chat_model, api_key=settings.openai_api_key)
        emb = OpenAIEmbeddings(model=settings.openai_embed_model, api_key=settings.openai_api_key)
        return llm, emb

    if settings.llm_provider == "ollama":
        llm = ChatOllama(model=settings.ollama_chat_model, base_url=settings.ollama_base_url)
        emb = OllamaEmbeddings(model=settings.ollama_embed_model, base_url=settings.ollama_base_url)
        return llm, emb

    raise RuntimeError("Invalid LLM_PROVIDER")

@app.post("/documents/upload")
@limiter.limit("10/minute")
async def upload_doc(
    request: Request,
    file: UploadFile = File(...),
    _auth=Depends(require_api_key),
):
    if not file.filename:
        raise HTTPException(400, "missing filename")

    content = await file.read()
    path = save_upload(content, file.filename)

    _, embeddings = get_llm_and_embeddings()
    result = ingest_file(path, embeddings)
    return {"file": file.filename, "saved_as": path, **result}

@app.post("/conversations")
@limiter.limit("30/minute")
def create_conversation(request: Request, _auth=Depends(require_api_key), db: Session = Depends(get_db)):
    cid = str(uuid.uuid4())
    db.add(Conversation(id=cid))
    db.commit()
    return {"conversation_id": cid}

@app.get("/conversations/{conversation_id}")
@limiter.limit("60/minute")
def get_conversation(
    conversation_id: str,
    request: Request,
    _auth=Depends(require_api_key),
    db: Session = Depends(get_db),
):
    convo = db.get(Conversation, conversation_id)
    if not convo:
        raise HTTPException(404, "not found")
    msgs = [{"role": m.role, "content": m.content, "created_at": str(m.created_at)} for m in convo.messages]
    return {"conversation_id": conversation_id, "messages": msgs}

@app.post("/chat")
@limiter.limit("20/minute")
async def chat(
    payload: dict,
    request: Request,
    _auth=Depends(require_api_key),
    db: Session = Depends(get_db),
):
    conversation_id = payload.get("conversation_id")
    user_message = payload.get("message")
    if not user_message:
        raise HTTPException(400, "missing message")

    if not conversation_id:
        conversation_id = str(uuid.uuid4())
        db.add(Conversation(id=conversation_id))
        db.commit()

    convo = db.get(Conversation, conversation_id)
    if not convo:
        raise HTTPException(404, "conversation not found")

    history = [{"role": m.role, "content": m.content} for m in convo.messages]

    db.add(Message(id=str(uuid.uuid4()), conversation_id=conversation_id, role="user", content=user_message))
    db.commit()

    llm, embeddings = get_llm_and_embeddings()
    assistant_text = await run_chat(llm, embeddings, user_message, history)

    db.add(Message(id=str(uuid.uuid4()), conversation_id=conversation_id, role="assistant", content=assistant_text))
    db.commit()

    return {"conversation_id": conversation_id, "answer": assistant_text}
