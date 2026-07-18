from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Loads the variables from the .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Creates the connection engine with the database
engine = create_engine(DATABASE_URL)

# Each request to the database will use a session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for the database models
Base = declarative_base()


# Dependency: opens and closes the database session automatically
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()