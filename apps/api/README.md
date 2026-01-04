# rag-api — FastAPI + LangChain + RAG

API de RAG enxuta e pragmática, pronta para ingestão de documentos e chat contextual.

---

## ✨ Destaques
- **Endpoints claros** para conversa, upload e chat.
- **Persistência local** com Chroma.
- **Integração simples** com a UI via X‑API‑Key.

---

## ⚙️ Rodar (Docker)
```bash
cp .env.example .env
docker compose up --build
```

---

## 🧪 Testes rápidos (curl)
```bash
# cria conversa
curl -X POST "http://localhost:8080/conversations" \
  -H "X-API-Key: changeme-super-secret"

# upload txt/md
curl -X POST "http://localhost:8080/documents/upload" \
  -H "X-API-Key: changeme-super-secret" \
  -F "file=@./meu_doc.txt"

# chat
curl -X POST "http://localhost:8080/chat" \
  -H "X-API-Key: changeme-super-secret" \
  -H "Content-Type: application/json" \
  -d '{"conversation_id":"<id>","message":"Resume o doc"}'
```

---

## 🧩 Endpoints
- `POST /conversations` → cria nova conversa
- `GET /conversations/{id}` → lista mensagens
- `POST /documents/upload` → ingestão de arquivo
- `POST /chat` → resposta com contexto

---

## 🗂️ Notas importantes
- Upload inicial suporta **.txt/.md** (robusto e simples). Para PDF/DOCX, adicione loaders.
- Vectorstore: **Chroma** persistente em `./data/chroma`.
- Rate limit ativo nos endpoints para proteção básica.

---

## 📄 Licença
MIT
