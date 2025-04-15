from pydantic import BaseModel
from datetime import datetime

class UserSchema(BaseModel):
    user_name: str
    user_email: str
    password: str
    last_update: int = int(datetime.timestamp(datetime.now()))
    created_on: int = int(datetime.timestamp(datetime.now()))

class UserLogin(BaseModel):
    user_email: str
    password: str

class NoteSchema(BaseModel):
    note_title: str
    note_content: str
    last_update: int = int(datetime.timestamp(datetime.now()))
    created_on: int = int(datetime.timestamp(datetime.now()))