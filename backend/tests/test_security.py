import pytest
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token
)


class TestHashPassword:

    def test_hash_is_different_from_plain_password(self):
        # Hash must never equal the original password
        hashed = hash_password("mysecretpassword")
        assert hashed != "mysecretpassword"

    def test_hash_is_a_non_empty_string(self):
        # Hash must return a valid string
        hashed = hash_password("mysecretpassword")
        assert isinstance(hashed, str)
        assert len(hashed) > 0

    def test_same_password_generates_different_hashes(self):
        # bcrypt uses salt — same password must generate different hashes
        hash1 = hash_password("mysecretpassword")
        hash2 = hash_password("mysecretpassword")
        assert hash1 != hash2


class TestVerifyPassword:

    def test_correct_password_returns_true(self):
        hashed = hash_password("mysecretpassword")
        assert verify_password("mysecretpassword", hashed) is True

    def test_wrong_password_returns_false(self):
        hashed = hash_password("mysecretpassword")
        assert verify_password("wrongpassword", hashed) is False

    def test_empty_password_returns_false(self):
        hashed = hash_password("mysecretpassword")
        assert verify_password("", hashed) is False


class TestJWT:

    def test_create_token_returns_string(self):
        token = create_access_token(data={"sub": "test@test.com"})
        assert isinstance(token, str)
        assert len(token) > 0

    def test_decode_valid_token_returns_email(self):
        token = create_access_token(data={"sub": "test@test.com"})
        email = decode_access_token(token)
        assert email == "test@test.com"

    def test_decode_invalid_token_returns_none(self):
        email = decode_access_token("invalid.token.here")
        assert email is None

    def test_decode_empty_token_returns_none(self):
        email = decode_access_token("")
        assert email is None