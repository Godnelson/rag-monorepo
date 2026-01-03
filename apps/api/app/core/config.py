from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    app_name: str = Field(default="rag-api", alias="APP_NAME")
    env: str = Field(default="dev", alias="ENV")
    api_key: str = Field(alias="API_KEY")

    database_url: str = Field(alias="DATABASE_URL")
    redis_url: str = Field(default="", alias="REDIS_URL")

    llm_provider: str = Field(default="openai", alias="LLM_PROVIDER")

    openai_api_key: str = Field(default="", alias="OPENAI_API_KEY")
    openai_chat_model: str = Field(default="gpt-4o-mini", alias="OPENAI_CHAT_MODEL")
    openai_embed_model: str = Field(default="text-embedding-3-small", alias="OPENAI_EMBED_MODEL")

    ollama_base_url: str = Field(default="http://localhost:11434", alias="OLLAMA_BASE_URL")
    ollama_chat_model: str = Field(default="llama3.1", alias="OLLAMA_CHAT_MODEL")
    ollama_embed_model: str = Field(default="nomic-embed-text", alias="OLLAMA_EMBED_MODEL")

    chroma_dir: str = Field(default="./data/chroma", alias="CHROMA_DIR")
    docs_dir: str = Field(default="./data/docs", alias="DOCS_DIR")

    top_k: int = Field(default=4, alias="TOP_K")
    max_context_chars: int = Field(default=12000, alias="MAX_CONTEXT_CHARS")

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
