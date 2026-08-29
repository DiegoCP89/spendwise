import pytest


class TestRegister:

    def test_register_new_user_returns_201(self, client):
        response = client.post("/auth/register", json={
            "name": "Diego Cruz",
            "email": "diego@test.com",
            "password": "senha123"
        })
        assert response.status_code == 201

    def test_register_returns_user_data(self, client):
        response = client.post("/auth/register", json={
            "name": "Diego Cruz",
            "email": "diego@test.com",
            "password": "senha123"
        })
        data = response.json()
        assert data["name"] == "Diego Cruz"
        assert data["email"] == "diego@test.com"
        assert "id" in data
        assert "created_at" in data

    def test_register_does_not_return_password(self, client):
        response = client.post("/auth/register", json={
            "name": "Diego Cruz",
            "email": "diego@test.com",
            "password": "senha123"
        })
        data = response.json()
        assert "password" not in data

    def test_register_duplicate_email_returns_400(self, client):
        user_data = {
            "name": "Diego Cruz",
            "email": "diego@test.com",
            "password": "senha123"
        }
        client.post("/auth/register", json=user_data)
        response = client.post("/auth/register", json=user_data)
        assert response.status_code == 400


class TestLogin:

    def test_login_valid_credentials_returns_200(self, client, registered_user):
        response = client.post("/auth/login", data={
            "username": registered_user["email"],
            "password": registered_user["password"]
        })
        assert response.status_code == 200

    def test_login_returns_access_token(self, client, registered_user):
        response = client.post("/auth/login", data={
            "username": registered_user["email"],
            "password": registered_user["password"]
        })
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"

    def test_login_wrong_password_returns_401(self, client, registered_user):
        response = client.post("/auth/login", data={
            "username": registered_user["email"],
            "password": "wrongpassword"
        })
        assert response.status_code == 401

    def test_login_nonexistent_email_returns_401(self, client):
        response = client.post("/auth/login", data={
            "username": "nobody@test.com",
            "password": "senha123"
        })
        assert response.status_code == 401


class TestMe:

    def test_me_authenticated_returns_200(self, client, auth_headers):
        response = client.get("/auth/me", headers=auth_headers)
        assert response.status_code == 200

    def test_me_returns_correct_user_data(self, client, registered_user, auth_headers):
        response = client.get("/auth/me", headers=auth_headers)
        data = response.json()
        assert data["email"] == registered_user["email"]
        assert data["name"] == registered_user["name"]

    def test_me_without_token_returns_401(self, client):
        response = client.get("/auth/me")
        assert response.status_code == 401

    def test_me_with_invalid_token_returns_401(self, client):
        response = client.get("/auth/me", headers={
            "Authorization": "Bearer invalid.token.here"
        })
        assert response.status_code == 401