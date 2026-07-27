from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# Auth Schemas
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    preferred_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    preferred_name: Optional[str] = None

class UserPreferenceSchema(BaseModel):
    main_goals: List[str] = []
    personal_context: Optional[str] = None
    communication_preference: str = "Balanced"
    memory_enabled: bool = True
    theme: str = "Aurora Dark"
    voice_preference: str = "Warm"
    notifications: str = "All"

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    preferred_name: Optional[str] = None
    active_persona_id: str
    preferences: Optional[UserPreferenceSchema] = None

    class Config:
        from_attributes = True

# Persona Schema
class PersonaResponse(BaseModel):
    id: str
    name: str
    subtitle: str
    description: str
    personality_traits: List[str]
    purpose: str
    quote: str
    avatar_type: str
    default_greeting: str

    class Config:
        from_attributes = True

# Chat Schemas
class MessageRequest(BaseModel):
    content: str
    conversation_id: Optional[str] = None
    persona_id: Optional[str] = None

class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    sender: str
    content: str
    timestamp: datetime

    class Config:
        from_attributes = True

class ConversationResponse(BaseModel):
    id: str
    persona_id: str
    title: str
    messages: List[MessageResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True

# Memory Schemas
class MemoryCreate(BaseModel):
    category: str = "Personal"
    title: Optional[str] = None
    content: str
    date_label: str = "TODAY"

class MemoryResponse(BaseModel):
    id: str
    category: str
    title: Optional[str] = None
    content: str
    date_label: str
    created_at: datetime

    class Config:
        from_attributes = True

# Goal Schemas
class GoalCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str = "Personal"
    start_date: Optional[str] = None
    target_date: Optional[str] = None
    progress: int = 0

class MilestoneCreate(BaseModel):
    title: str
    completed: bool = False

class GoalResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    category: str
    start_date: Optional[str] = None
    target_date: Optional[str] = None
    progress: int
    status: str

    class Config:
        from_attributes = True

# Habit Schemas
class HabitCreate(BaseModel):
    title: str
    icon: str = "🧘"
    frequency: str = "Daily"

class HabitResponse(BaseModel):
    id: str
    title: str
    icon: str
    frequency: str
    streak_count: int
    completed_today: bool = False

    class Config:
        from_attributes = True

# Reflection Schemas
class ReflectionCreate(BaseModel):
    date: str
    prompt_answers: Dict[str, str]

class ReflectionResponse(BaseModel):
    id: str
    date: str
    prompt_answers: Dict[str, str]
    feedback: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Mood Schemas
class MoodCreate(BaseModel):
    mood_type: str
    mood_score: int = 5
    note: Optional[str] = None

class MoodResponse(BaseModel):
    id: str
    mood_type: str
    mood_score: int
    note: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Journal Schemas
class JournalCreate(BaseModel):
    date_label: str
    title: str
    preview: str
    content: str
    category: str = "Reflection"

class JournalResponse(BaseModel):
    id: str
    date_label: str
    title: str
    preview: str
    content: str
    category: str
    created_at: datetime

    class Config:
        from_attributes = True
