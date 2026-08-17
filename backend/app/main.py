from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import category, expense, user
from app.routers import categories, expenses
from app.routers import auth as auth_router

# Creates the FastAPI application instance
app = FastAPI(
    title="SpendWise API",
    description="Personal Expense Tracker REST API",
    version="1.0.0"
)

# Allows the React frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Creates all database tables automatically on startup
Base.metadata.create_all(bind=engine)

# Registers the routers
app.include_router(categories.router)
app.include_router(expenses.router)
app.include_router(auth_router.router)


@app.get("/")
def root():
    return {"message": "SpendWise API is running"}