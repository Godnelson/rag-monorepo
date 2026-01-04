# rag-ui — Chat + RAG com UX moderna

Uma interface elegante e objetiva para conversar com seu conhecimento privado via RAG.
Pensada para ser **rápida**, **bonita** e **fácil de integrar** com o backend do projeto.

---

## ✨ Destaques
- **Fluxo de conversa fluido** com histórico por conversa e atualizações em tempo real.
- **Upload de documentos** integrado ao RAG para enriquecer respostas.
- **Design minimalista** com foco em legibilidade e produtividade.
- **Configuração simples** via Settings (API Base + chave).

---

## 🧱 Stack
- **Next.js** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS**
- **Sonner** (toasts)
- **Lucide** (icons)

---

## 🚀 Como rodar
```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Abra: http://localhost:3000

Depois vá em **Settings** e configure:
- **API Base**: `http://localhost:8080`
- **X-API-Key**: `changeme-super-secret`

---

## 🧭 Fluxo do usuário
1. Crie uma conversa (ou reutilize uma existente).
2. Faça upload de documentos para enriquecer o contexto.
3. Pergunte qualquer coisa e receba respostas com base no seu conteúdo.

---

## 🧩 Estrutura (alto nível)
```
src/
  app/               # App Router
  components/        # UI modular (sidebar, chat, settings)
  lib/               # API client e storage
```

---

## 🛣️ Próximos passos (ideias)
- Suporte a múltiplos formatos (PDF/DOCX)
- Favoritar conversas
- Melhorias visuais no histórico

---

## 📄 Licença
MIT
