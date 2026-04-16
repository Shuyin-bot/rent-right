from fastapi import APIRouter
from pydantic import BaseModel
from pydantic_ai.messages import ModelMessage
from app.services.agent import rental_agent

router = APIRouter(prefix="/assistant")

# --- IN-MEMORY CHAT DATABASE ---
# For the demo, sessions are stored in memory.
# In production: use Redis or Postgres.
chat_sessions: dict[str, list[ModelMessage]] = {}


class UserQuery(BaseModel):
    session_id: str
    prompt: str


@router.get("/welcome/{session_id}")
async def welcome_message(session_id: str):
    """Initializes a new chat session and returns the welcome greeting."""
    chat_sessions[session_id] = []

    return {
        "session_id": session_id,
        "message": (
            "Welcome to Rent Right! 🏠\n"
            "I'm your AI-powered German tenant rights assistant. "
            "Tell me what's happening with your rental — in English or German — "
            "and I'll identify your legal options, draft a formal letter to your landlord, "
            "and walk you through the next steps.\n\n"
            "What's your situation?"
        ),
    }


@router.post("/ask")
async def ask_assistant(query: UserQuery):
    """Processes a tenant's message, maintains session history, returns structured analysis."""

    # 1. Fetch conversation history for this session
    history = chat_sessions.get(query.session_id, [])

    # 2. Run the agent with history so it remembers the conversation
    result = await rental_agent.run(
        query.prompt,
        message_history=history,
    )

    # 3. Save updated history back
    chat_sessions[query.session_id] = result.all_messages()

    # 4. Return structured output
    return result.output
