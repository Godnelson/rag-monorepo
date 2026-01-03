# rag-api (FastAPI + LangChain + RAG)

## Rodar (Docker)
```bash
cp .env.example .env
docker compose up --build
```

## Testes rápidos
```bash
# cria conversa
curl -X POST "http://localhost:8080/conversations" -H "X-API-Key: changeme-super-secret"

# upload txt/md
curl -X POST "http://localhost:8080/documents/upload"   -H "X-API-Key: changeme-super-secret"   -F "file=@./meu_doc.txt"

# chat
curl -X POST "http://localhost:8080/chat"   -H "X-API-Key: changeme-super-secret"   -H "Content-Type: application/json"   -d '{"conversation_id":"<id>","message":"Resume o doc"}'
```

## Notas
- Upload inicial suporta `.txt`/`.md` (rápido e robusto). Para PDF/DOCX, adicione loaders.
- Vectorstore: Chroma persistente em `./data/chroma`.
