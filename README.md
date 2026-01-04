# RAG Monorepo — Full‑stack Chat + Retrieval

Uma stack completa para **Chat + RAG**, pronta para rodar localmente com **API FastAPI + LangChain** e **UI Next.js moderna**.

---

## 🎬 Demo (10–15s)
![Demo do chat + upload](docs/demo.gif)

> Dica: grave um GIF curto com chat + upload para deixar o repositório “portfólio‑ready”.
> Coloque o arquivo em `docs/demo.gif` (não versionado por padrão).

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

## 🗺️ Arquitetura (diagrama simples)
```mermaid
flowchart LR
  UI[Next.js UI] -->|HTTP + X-API-Key| API[FastAPI + LangChain]
  API -->|Embeddings + RAG| VS[Chroma (persistente)]
  API -->|LLM| LLM[OpenAI ou Ollama]
  Docs[Uploads .txt/.md] --> API
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

## ⚖️ Tradeoffs (decisões atuais)
**Vectorstore**
- **Chroma**: simples, local, zero infra extra.
- **pgvector**: melhor para escala/SQL, mas exige Postgres e tuning.

**LLM**
- **OpenAI**: qualidade alta, depende de custo e internet.
- **Ollama**: local e privado, mas mais pesado e pode ter menor qualidade.

---

## 🧭 Roadmap
- Streaming de respostas no chat.
- migração opcional para **pgvector**.
- Autenticação com **JWT** e multi‑usuário.

---

## 🛡️ Threat model (curto)
- **Abuso de API**: mitigado com **rate limit** e API key.
- **CORS**: liberado para facilitar o front; restringir em produção.
- **Upload malicioso**: validar tipos e tamanho de arquivos.

---

## 📄 Licença
MIT
