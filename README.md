# AI Portfolio Stack (Dynamic UI + Chatbot + Backend)

Implemented the stack you requested:

- **Frontend**: Next.js (animated UI with Framer Motion)
- **Backend API**: FastAPI
- **Orchestration**: LangGraph
- **LLM**: Groq Llama 3
- **Embeddings/Vector/Obs hooks**: ready to extend with Cohere, Qdrant, Langfuse

## Project structure

- `frontend/` Next.js app with dynamic animated UI and chatbot panel.
- `backend/` FastAPI service with LangGraph chatbot workflow.
- `docker-compose.yml` for local multi-service run.

## Run locally

```bash
docker compose up
```

Then open:

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:8000/docs>

## Environment variables

Set before startup:

- `GROQ_API_KEY`

## Notes

- Current chatbot uses LangGraph + Groq directly.
- Add Qdrant/Cohere/Langfuse integration in `backend/app/graph.py` as the next step for full RAG/observability.
