# SpendWise — Rastreador de Despesas Pessoais

![SpendWise](https://img.shields.io/badge/SpendWise-Finanças%20Pessoais-1a6b3c?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql)
![Tests](https://img.shields.io/badge/Testes-22%20passando-2d9e5f?style=for-the-badge)

> Aplicação web full-stack de controle de despesas pessoais desenvolvida com React, FastAPI e PostgreSQL — com autenticação JWT, testes automatizados e deploy em produção.

🌐 **Demo ao vivo:** [spendwise-lime-two.vercel.app](https://spendwise-lime-two.vercel.app)
📖 **Documentação da API:** [spendwise-api-8ucm.onrender.com/docs](https://spendwise-api-8ucm.onrender.com/docs)
🇺🇸 **English version:** [README.md](README.md)

---

## Visão Geral

O SpendWise permite que usuários autenticados registrem, categorizem, editem e excluam despesas diárias, além de visualizar resumos financeiros em tempo real. Os dados de cada usuário são completamente isolados — nenhuma informação é compartilhada entre contas.

---

## Funcionalidades

- 🔐 **Autenticação segura** — tokens JWT com hash de senha em bcrypt
- 💸 **Gestão completa de despesas** — criar, listar, editar e excluir
- 🏷️ **Gestão de categorias** — criar e excluir categorias personalizadas
- 💰 **Resumo em tempo real** — total de gastos calculado automaticamente
- ✅ **Validação de formulários** — campos obrigatórios, valores positivos, datas não futuras
- 🚨 **Modais de confirmação** — para exclusão e logout
- 📱 **Design responsivo** — funciona em desktop e mobile
- 🧪 **Testes automatizados** — 22 testes unitários e de integração passando

---

## Stack Tecnológica

| Camada          | Tecnologia           |
| --------------- | -------------------- |
| Frontend        | React 18 + Vite      |
| Backend         | Python 3 + FastAPI   |
| Banco de dados  | PostgreSQL           |
| ORM             | SQLAlchemy + Alembic |
| Autenticação    | JWT + bcrypt         |
| Testes          | pytest + httpx       |
| Deploy Frontend | Vercel               |
| Deploy Backend  | Render               |

---

## Arquitetura

```
┌─────────────────────┐         ┌──────────────────────┐
│   React (Vercel)    │ ──────► │  FastAPI (Render)     │
│   porta 5173 / CDN  │  HTTPS  │  porta 8000           │
└─────────────────────┘         └──────────┬───────────┘
                                            │
                                 ┌──────────▼───────────┐
                                 │  PostgreSQL (Render)  │
                                 └──────────────────────┘
```

---

## Estrutura do Projeto

```
spendwise/
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── security.py      # JWT e bcrypt
│   │   │   └── dependencies.py  # Injeção de dependência de autenticação
│   │   ├── models/              # Modelos SQLAlchemy
│   │   ├── routers/             # Endpoints da API
│   │   ├── schemas/             # Schemas Pydantic
│   │   ├── database.py          # Conexão com banco
│   │   └── main.py              # Aplicação FastAPI
│   ├── tests/
│   │   ├── conftest.py          # Fixtures de teste
│   │   ├── test_auth.py         # Testes de integração (12)
│   │   └── test_security.py     # Testes unitários (10)
│   ├── migrations/              # Migrações Alembic
│   ├── Procfile                 # Comando de inicialização no Render
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

## Como Executar Localmente

### Pré-requisitos

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

### Backend

```bash
# Clonar o repositório
git clone https://github.com/DiegoCP89/spendwise.git
cd spendwise/backend

# Criar e ativar o ambiente virtual
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# Instalar dependências
pip install -r requirements.txt

# Criar arquivo .env
# Adicione: DATABASE_URL, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

# Executar migrações
alembic upgrade head

# Iniciar o servidor
uvicorn app.main:app --reload
```

Backend disponível em: `http://localhost:8000`
Documentação da API: `http://localhost:8000/docs`

### Frontend

```bash
cd ../frontend

# Instalar dependências
npm install

# Criar arquivo .env.local
echo "VITE_API_URL=http://localhost:8000" > .env.local

# Iniciar servidor de desenvolvimento
npm run dev
```

Frontend disponível em: `http://localhost:5173`

### Executar os Testes

```bash
cd backend
pytest tests/ -v
```

Resultado esperado: **22 testes passando**

---

## Endpoints da API

| Método | Endpoint           | Descrição              | Auth |
| ------ | ------------------ | ---------------------- | ---- |
| POST   | `/auth/register`   | Criar conta            | ❌   |
| POST   | `/auth/login`      | Login e obter token    | ❌   |
| GET    | `/auth/me`         | Dados do usuário atual | ✅   |
| GET    | `/categories/`     | Listar categorias      | ✅   |
| POST   | `/categories/`     | Criar categoria        | ✅   |
| DELETE | `/categories/{id}` | Excluir categoria      | ✅   |
| GET    | `/expenses/`       | Listar despesas        | ✅   |
| POST   | `/expenses/`       | Criar despesa          | ✅   |
| PUT    | `/expenses/{id}`   | Editar despesa         | ✅   |
| DELETE | `/expenses/{id}`   | Excluir despesa        | ✅   |

---

## Segurança

- Senhas com hash **bcrypt** — nunca armazenadas em texto puro
- **Tokens JWT** com expiração de 30 minutos
- Todos os endpoints de dados exigem token válido
- Cada usuário acessa apenas seus próprios dados (**isolamento por user_id**)
- Operações destrutivas exigem confirmação do usuário via modal

---

## Roadmap — Melhorias Futuras

- [ ] Mecanismo de refresh do token
- [ ] Edição de perfil do usuário (nome, e-mail, senha)
- [ ] Filtro de despesas por mês e categoria
- [ ] Gráficos de gastos por categoria (Recharts)
- [ ] Cadastro de receitas e cálculo de saldo
- [ ] Exportação de relatório em PDF
- [ ] Containerização com Docker

---

## Sobre o Projeto

O SpendWise foi desenvolvido como Trabalho de Conclusão de Curso (TCC) do curso de Análise e Desenvolvimento de Sistemas da Fatec Franca/SP, com foco em boas práticas de desenvolvimento full-stack e preparação para o mercado internacional de tecnologia.

---

## Autor

**Diego Cruz Pereira**

- GitHub: [@DiegoCP89](https://github.com/DiegoCP89)
- LinkedIn: [linkedin.com/in/diegocp89](https://www.linkedin.com/in/diegocp89)

---

## Licença

Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).
