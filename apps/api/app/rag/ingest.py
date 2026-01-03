import os
import uuid
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader

from app.core.config import settings
from app.rag.vectorstore import get_vectorstore

def save_upload(file_bytes: bytes, filename: str) -> str:
    os.makedirs(settings.docs_dir, exist_ok=True)
    safe_name = f"{uuid.uuid4()}_{filename}"
    path = os.path.join(settings.docs_dir, safe_name)
    with open(path, "wb") as f:
        f.write(file_bytes)
    return path

def ingest_file(path: str, embeddings) -> dict:
    # MVP: txt/md
    loader = TextLoader(path, encoding="utf-8")
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    chunks = splitter.split_documents(docs)

    vs = get_vectorstore(embeddings)
    vs.add_documents(chunks)
    vs.persist()

    return {"chunks_added": len(chunks)}
