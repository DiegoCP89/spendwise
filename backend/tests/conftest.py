import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db

# Use SQLite in memory for tests — does not affect the real database
SQLALCHEMY_TEST_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_TEST_URL,
    connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def override_get_db():
    # Replaces the real database with the test database
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


# Override the dependency — API will use test database
app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="function", autouse=True)
def setup_database():
    # Creates all tables before each test
    Base.metadata.create_all(bind=engine)
    yield
    # Drops all tables after each test — starts clean
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client():
    # HTTP client for testing the API
    with TestClient(app) as c:
        yield c


@pytest.fixture
def registered_user(client):
    # Creates a test user and returns their credentials
    user_data = {
        "name": "Test User",
        "email": "test@test.com",
        "password": "testpass123"
    }
    client.post("/auth/register", json=user_data)
    return user_data


@pytest.fixture
def auth_headers(client, registered_user):
    # Returns authorization headers for authenticated requests
    response = client.post("/auth/login", data={
        "username": registered_user["email"],
        "password": registered_user["password"]
    })
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}