from fastapi import FastAPI
from app.database import db
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:3000", 
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

from app.routes import router

app.include_router(router)