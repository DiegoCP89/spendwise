from fastapi import FastAPI
from app.database import engine, Base
from app.models import category, expense
from app.routers import categories, expenses

# Creates the FastAPI application instance
app = FastAPI(
    title="SpendWise API",
    description="Personal Expense Tracker REST API",
    version="1.0.0"
)

# Creates all database tables automatically on startup
Base.metadata.create_all(bind=engine)

# Registers the categories router
app.include_router(categories.router)
app.include_router(expenses.router)  


@app.get("/")
def root():
    return {"message": "SpendWise API is running"}