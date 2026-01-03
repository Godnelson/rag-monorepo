from app.core.config import settings
from app.rag.vectorstore import get_vectorstore

def build_context(query: str, embeddings) -> str:
    vs = get_vectorstore(embeddings)
    retriever = vs.as_retriever(search_kwargs={"k": settings.top_k})
    docs = retriever.get_relevant_documents(query)

    joined = "\n\n".join([f"[Doc]\n{d.page_content}" for d in docs])
    return joined[: settings.max_context_chars]

async def run_chat(llm, embeddings, user_message: str, history: list[dict]) -> str:
    context = build_context(user_message, embeddings)

    system = (
        "Você é um assistente útil. Responda em PT-BR. "
        "Use o CONTEXTO quando relevante. Se não houver informação suficiente, diga isso."
    )

    messages = [{"role": "system", "content": system}]
    if context.strip():
        messages.append({"role": "system", "content": f"CONTEXTO:\n{context}"})

    messages.extend(history[-12:])
    messages.append({"role": "user", "content": user_message})

    resp = await llm.ainvoke(messages)
    return getattr(resp, "content", str(resp))
