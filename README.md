# RAG Monorepo

Monorepo contendo **API FastAPI + LangChain (RAG)** e **UI Next.js moderna**.

## Estrutura
```
apps/api  -> backend
apps/web  -> frontend
infra     -> docker-compose da stack completa
```

## Rodar tudo
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local

docker compose -f infra/docker-compose.yml up --build
```

- UI: http://localhost:3000
- API: http://localhost:8080
