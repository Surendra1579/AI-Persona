import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional, List, Dict
from app.database import get_db
from app.ai.llm_service import llm_service
from app.ai.memory_engine import MemoryEngine
from app.ai.web_search import web_search_service
from app.models import User, Persona, Conversation, Message, Memory
from pydantic import BaseModel

logger = logging.getLogger("app.api.chat")
logger.setLevel(logging.INFO)

if not logger.handlers:
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    ch.setFormatter(formatter)
    logger.addHandler(ch)

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str
    persona_id: str
    conversation_id: Optional[str] = None

@router.post("")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    logger.info("=== Chat Request Received ===")
    logger.info(f"User message: '{request.message}'")
    logger.info(f"Selected persona ID: '{request.persona_id}'")

    # 1. Fetch persona details
    persona = db.query(Persona).filter(Persona.id == request.persona_id).first()
    if not persona:
        logger.error(f"Selected persona '{request.persona_id}' not found in database.")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Persona '{request.persona_id}' not found."
        )

    # 2. Fetch or create a default user for execution context
    user = db.query(User).first()
    if not user:
        logger.info("Creating default explorer user.")
        user = User(
            email="explorer@origen.ai",
            hashed_password="mock_password_hash",
            full_name="Explorer",
            preferred_name="Explorer"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # 3. Get or create active conversation
    conversation = None
    if request.conversation_id:
        conversation = db.query(Conversation).filter(
            Conversation.id == request.conversation_id,
            Conversation.user_id == user.id
        ).first()
    
    if not conversation:
        conversation = db.query(Conversation).filter(
            Conversation.user_id == user.id,
            Conversation.persona_id == request.persona_id
        ).order_by(Conversation.updated_at.desc()).first()

    if not conversation:
        conversation = Conversation(
            user_id=user.id,
            persona_id=request.persona_id,
            title=f"Chat with {persona.name}"
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # 4. Fetch recent conversation history
    history_records = db.query(Message).filter(
        Message.conversation_id == conversation.id
    ).order_by(Message.timestamp.asc()).all()

    conversation_history: List[Dict[str, str]] = [
        {"role": msg.sender, "content": msg.content}
        for msg in history_records[-10:]
    ]

    # Save incoming user message
    user_msg_db = Message(
        conversation_id=conversation.id,
        sender="user",
        content=request.message
    )
    db.add(user_msg_db)
    
    # Extract & store memories if any important personal goals or facts are mentioned
    new_memories = MemoryEngine.extract_memories_from_text(request.message)
    for mem in new_memories:
        db.add(Memory(
            user_id=user.id,
            category=mem.get("category", "Personal"),
            content=mem.get("content", request.message)
        ))
    db.commit()

    # 5. Build user memory context
    user_context = MemoryEngine.build_user_context(db, user, request.persona_id)

    # 6. Check & execute web search for real-time query requirement
    web_search_context = None
    if web_search_service.requires_realtime_info(request.message):
        logger.info(f"Real-time information requirement detected for: '{request.message}'")
        web_search_context = await web_search_service.perform_search(request.message)

    # 7. Generate response via LLM service
    try:
        response_text = await llm_service.generate_response(
            system_prompt=persona.system_prompt,
            context=user_context,
            current_message=request.message,
            web_search_context=web_search_context,
            conversation_history=conversation_history
        )
    except Exception as e:
        logger.error(f"Error in LLM service execution: {e}", exc_info=True)
        response_text = llm_service._smart_fallback(request.message, persona.system_prompt)

    # Save AI response to DB
    ai_msg_db = Message(
        conversation_id=conversation.id,
        sender="ai",
        content=response_text
    )
    db.add(ai_msg_db)
    db.commit()

    return {
        "response": response_text,
        "conversation_id": conversation.id
    }
