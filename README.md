# SpendWise — Personal Expense Tracker

![SpendWise](https://img.shields.io/badge/SpendWise-Personal%20Finance-1a6b3c?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql)
![Tests](https://img.shields.io/badge/Tests-22%20passing-2d9e5f?style=for-the-badge)

> A full-stack personal expense tracker built with React, FastAPI and PostgreSQL — featuring JWT authentication, automated tests, and live deployment.

🌐 **Live Demo:** [spendwise-lime-two.vercel.app](https://spendwise-lime-two.vercel.app)
📖 **API Docs:** [spendwise-api-8ucm.onrender.com/docs](https://spendwise-api-8ucm.onrender.com/docs)
🇧🇷 **Versão em Português:** [README.pt.md](README.pt.md)

---

## Overview

SpendWise allows authenticated users to record, categorize, edit and delete daily expenses, and view real-time financial summaries. Each user's data is fully isolated — no data is shared between accounts.

---

## Features

- 🔐 **Secure authentication** — JWT tokens with bcrypt password hashing
- 💸 **Full expense management** — create, read, update and delete expenses
- 🏷️ **Category management** — create and delete custom categories
- 💰 **Real-time summary** — total spending calculated automatically
- ✅ **Form validation** — required fields, positive amounts, no future dates
- 🚨 **Confirmation modals** — for delete and logout actions
- 📱 **Responsive design** — works on desktop and mobile
- 🧪 **Automated tests** — 22 unit and integration tests passing

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Python 3 + FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy + Alembic |
| Auth | JWT + bcrypt |
| Testing | pytest + httpx |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## Architecture

```
┌─────────────────────┐         ┌──────────────────────┐
│   React (Vercel)    │ ──────► │  FastAPI (Render)     │
│   port 5173 / CDN   │  HTTPS  │  port 8000            │
└─────────────────────┘         └──────────┬───────────┘
                                            │
                                 ┌──────────▼───────────┐
                                 │  PostgreSQL (Render)  │
                                 └──────────────────────┘
```

---

## Project Structure

```
spendwise/
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── security.py      # JWT and bcrypt
│   │   │   └── dependencies.py  # Auth dependency injection
│   │   ├── models/              # SQLAlchemy models
│   │   ├── routers/             # API endpoints
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── database.py          # DB connection
│   │   └── main.py              # FastAPI app
│   ├── tests/
│   │   ├── conftest.py          # Test fixtures
│   │   ├── test_auth.py         # Integration tests (12)
│   │   └── test_security.py     # Unit tests (10)
│   ├── migrations/              # Alembic migrations
│   ├── Procfile                 # Render startup command
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── ExpenseList.jsx
│       │   ├── ExpenseForm.jsx
│       │   ├── ExpenseSummary.jsx
│       │   ├── CategoryList.jsx
│       │   ├── CategoryForm.jsx
│       │   ├── ConfirmModal.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── App.jsx
│       └── index.css
└── README.md
```

---

## Getting Started — Local Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

### Backend

```bash
# Clone the repository
git clone https://github.com/DiegoCP89/spendwise.git
cd spendwise/backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your PostgreSQL credentials and SECRET_KEY

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```

Backend running at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
echo "VITE_API_URL=http://localhost:8000" > .env.local

# Start development server
npm run dev
```

Frontend running at: `http://localhost:5173`

### Running Tests

```bash
cd backend
pytest tests/ -v
```

Expected output: **22 passed**

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Create account | ❌ |
| POST | `/auth/login` | Login and get token | ❌ |
| GET | `/auth/me` | Get current user | ✅ |
| GET | `/categories/` | List categories | ✅ |
| POST | `/categories/` | Create category | ✅ |
| DELETE | `/categories/{id}` | Delete category | ✅ |
| GET | `/expenses/` | List expenses | ✅ |
| POST | `/expenses/` | Create expense | ✅ |
| PUT | `/expenses/{id}` | Update expense | ✅ |
| DELETE | `/expenses/{id}` | Delete expense | ✅ |

---

## Security

- Passwords hashed with **bcrypt** — never stored in plain text
- **JWT tokens** with 30-minute expiration
- All data endpoints require valid token
- Each user can only access their own data (**row-level isolation**)
- Protected operations require user confirmation via modal

---

## Roadmap

- [ ] Token refresh mechanism
- [ ] Edit user profile (name, email, password)
- [ ] Filter expenses by month and category
- [ ] Spending charts by category (Recharts)
- [ ] Income tracking and balance calculation
- [ ] PDF report export
- [ ] Docker containerization

---

## Author

**Diego Cruz Pereira**
- GitHub: [@DiegoCP89](https://github.com/DiegoCP89)
- LinkedIn: [linkedin.com/in/diegocp89](https://www.linkedin.com/in/diegocp89)

---

## License

This project is open source and available under the [MIT License](LICENSE).
