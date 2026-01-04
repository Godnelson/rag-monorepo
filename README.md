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

## 👀 O que salta aos olhos (recrutador + time técnico)
**Produto**
- **Experiência de chat limpa e objetiva**, com histórico por conversa e upload integrado.
- **Setup curto**: sobe tudo com Docker e variáveis simples.
- **MVP funcional** com foco em velocidade de entrega e iteração.

**Engenharia**
- **Separação clara de camadas** (UI, API, infraestrutura).
- **RAG pragmático**: ingestão → chunking → vector store → retrieval → chat.
- **Pontos de evolução explícitos** (tradeoffs e roadmap abaixo).

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
