import os
from app.core.config import settings
from langchain_community.vectorstores import Chroma

def get_vectorstore(embeddings):
    os.makedirs(settings.chroma_dir, exist_ok=True)
    return Chroma(
        collection_name="docs",
        embedding_function=embeddings,
        persist_directory=settings.chroma_dir,
    )
