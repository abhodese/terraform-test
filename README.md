# Modern AI Portfolio (Interactive UI + Chatbot Backend)

Upgraded with a modern interactive experience inspired by the style reference you shared.

## Stack

- **Frontend:** Next.js + Framer Motion animations
- **Backend:** FastAPI + LangGraph + Groq
- **Runtime:** Docker Compose for local full-stack launch

## UX features added

- Animated hero and section entrances
- Interactive project cards with hover transitions
- Experience timeline cards
- Live AI chat assistant with:
  - quick-prompt chips
  - message bubbles
  - loading/typing state
  - custom question input

## Run

```bash
docker compose up
```

Then visit:

- Frontend: <http://localhost:3000>
- Backend docs: <http://localhost:8000/docs>

## Env var

- `GROQ_API_KEY`
