# Modern AI Portfolio (Interactive UI + Chatbot Backend)

Upgraded with a modern interactive experience inspired by your shared reference.

## Stack

- **Frontend:** Next.js + Framer Motion animations
- **Backend:** FastAPI + LangGraph + Groq
- **Runtime:** Docker Compose for local full-stack launch

## UX features added

- Animated hero and section entrances
- Interactive project cards with hover transitions
- Experience timeline cards
- Live AI chat assistant with quick prompts, message bubbles, loading state, and custom input

## Run locally

```bash
docker compose up
```

Then visit:

- Frontend: <http://localhost:3000>
- Backend docs: <http://localhost:8000/docs>

## Netlify deployment (frontend)

This repo now includes:

- `netlify.toml` configured for **Next.js app in `frontend/`**
- GitHub Action `deploy-netlify.yml` for automatic deploy from `main`

### Required GitHub Secrets

Set these in your GitHub repo settings:

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

### Required Netlify env var

In Netlify site settings, set:

- `NEXT_PUBLIC_API_BASE` = your deployed FastAPI URL (e.g., Render)

> Without these secrets/env vars, deploy workflow will exist but cannot publish.

## Env var for backend

- `GROQ_API_KEY`
