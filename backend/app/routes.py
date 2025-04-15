from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from datetime import datetime
from .database import users_collection, notes_collection
import uuid
from .models import UserSchema, UserLogin, NoteSchema
from .auth import hash_password, verify_password, create_access_token
from .validation import get_current_user


router = APIRouter()

@router.post("/api/signin")
async def create_user(user:UserSchema):
    try:
       if users_collection.find_one({"user_email": user.user_email}):
         raise HTTPException(status_code=400, detail="Email already exists")
       new_user={
        "user_id": str(uuid.uuid4()),
        "user_name": user.user_name,
        "user_email": user.user_email,
        "password": hash_password(user.password),
        "created_on": datetime.utcnow(),
        "last_update": datetime.utcnow()
       }
       users_collection.insert_one(new_user)
       return {"msg": "User created successfully"}
    except Exception as e:
      return HTTPException(status_code=500, detail=f"Error in creating user {e}")


@router.post("/api/login")
async def login(user: UserLogin):
    try:
        db_user = users_collection.find_one({"user_email": user.user_email})
        if not db_user or not verify_password(user.password, db_user["password"]):
           raise HTTPException(status_code=401, detail="Invalid credentials")
        token = create_access_token(data={"sub": db_user["user_id"]})
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
      return HTTPException(status_code=500, detail=f"Error in login user {e}")

@router.get("/api/user")
def get_notes(user_id: str = Depends(get_current_user)):
    user = users_collection.find_one({"user_id": user_id}, {"_id": 0})
    return user

# Note Routes
@router.post("/api/notes")
def create_note(note: NoteSchema, user_id: str = Depends(get_current_user)):
    new_note = {
        "note_id": str(uuid.uuid4()),
        "note_title": note.note_title,
        "note_content": note.note_content,
        "user_id": user_id,
        "created_on": datetime.utcnow(),
        "last_update": datetime.utcnow()
    }
    notes_collection.insert_one(new_note)
    return {"data":jsonable_encoder(new_note),"msg": "Note created successfully"}

@router.get("/api/notes")
def get_notes(user_id: str = Depends(get_current_user)):
    notes = list(notes_collection.find({"user_id": user_id}, {"_id": 0}))
    return notes

@router.get("/api/notes/{note_id}")
def get_note(note_id: str, user_id: str = Depends(get_current_user)):
    note = notes_collection.find_one({"note_id": note_id, "user_id": user_id}, {"_id": 0})
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@router.put("/api/notes/{note_id}")
def update_note(note_id: str, note: NoteSchema, user_id: str = Depends(get_current_user)):
    updated = notes_collection.update_one(
        {"note_id": note_id, "user_id": user_id},
        {"$set": {
            "note_title": note.note_title,
            "note_content": note.note_content,
            "last_update": datetime.utcnow()
        }}
    )
    if updated.modified_count == 0:
        raise HTTPException(status_code=404, detail="Note not found or not owned by user")
    return {"data":jsonable_encoder(updated) ,"msg": "Note updated"}

@router.delete("/api/notes/{note_id}")
def delete_note(note_id: str, user_id: str = Depends(get_current_user)):
    result = notes_collection.delete_one({"note_id": note_id, "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found or not owned by user")
    return {"msg": "Note deleted"}