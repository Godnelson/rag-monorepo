# RAG Monorepo — Full‑stack Chat + Retrieval

Uma stack completa para **Chat + RAG**, pronta para rodar localmente com **API FastAPI + LangChain** e **UI Next.js moderna**.

---

## 🌟 Visão rápida
- **Backend RAG** com ingestão de documentos e chat contextual.
- **Frontend moderno** com histórico de conversas e upload de arquivos.
- **Infra Docker** para subir tudo em minutos.

---

## 🧱 Estrutura do repositório
```
apps/api  -> backend (FastAPI + LangChain)
apps/web  -> frontend (Next.js + Tailwind)
infra     -> docker-compose da stack completa
```

---

## 🚀 Rodar tudo (Docker)
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local

docker compose -f infra/docker-compose.yml up --build
```

**URLs locais**
- UI: http://localhost:3000
- API: http://localhost:8080

---

## 🔎 O que dá pra fazer
- Criar conversas e manter histórico.
- Subir documentos e perguntar sobre o conteúdo.
- Integrar a UI ao backend via API Base + X‑API‑Key.

---

## 🧭 Próximos passos sugeridos
- Suporte a PDF/DOCX com novos loaders.
- Refinar prompt/estratégia de chunking.
- Autenticação por usuário e gestão de organizações.

---

## 📄 Licença
MIT
