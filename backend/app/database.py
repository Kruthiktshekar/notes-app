from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

try:
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client["notes_app"]
    users_collection = db["users"]
    notes_collection = db["notes"]
    print("Connected to database successfully!")
except Exception as e:
    print("Failed to connect to database:", e)