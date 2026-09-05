import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmModal from "./components/ConfirmModal";

const API_URL = "http://localhost:8000";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [token, setToken] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  async function fetchExpenses() {
    const response = await axios.get(`${API_URL}/expenses/`);
    setExpenses(response.data);
  }

  async function fetchCategories() {
    const response = await axios.get(`${API_URL}/categories/`);
    setCategories(response.data);
  }

  function handleDeleteClick(id) {
    setModalConfig({
      message:
        "Are you sure you want to delete this expense? This action cannot be undone.",
      onConfirm: async () => {
        await axios.delete(`${API_URL}/expenses/${id}/`);
        fetchExpenses();
        setModalConfig(null);
      },
    });
  }

  function handleLogoutClick() {
    setModalConfig({
      message: "Are you sure you want to logout?",
      onConfirm: () => {
        setToken(null);
        delete axios.defaults.headers.common["Authorization"];
        setModalConfig(null);
      },
    });
  }

  function handleEditExpense(expense) {
    setExpenseToEdit(expense);
  }

  function handleExpenseUpdated() {
    setExpenseToEdit(null);
    fetchExpenses();
  }

  function handleLogin(receivedToken) {
    setToken(receivedToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
    fetchExpenses();
    fetchCategories();
  }

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  if (!token) {
    if (showRegister) {
      return <Register onShowLogin={() => setShowRegister(false)} />;
    }
    return (
      <Login
        onLogin={handleLogin}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <>
      {modalConfig && (
        <ConfirmModal
          message={modalConfig.message}
          onConfirm={modalConfig.onConfirm}
          onCancel={() => setModalConfig(null)}
        />
      )}

      <div className="header">
        <div className="header-logo">
          <div className="logo-icon">$</div>
          <span>SpendWise</span>
        </div>
        <button className="btn btn-secondary" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>

      <div className="main-container">
        <ExpenseSummary expenses={expenses} />
        <ExpenseList
          expenses={expenses}
          categories={categories}
          onDelete={handleDeleteClick}
          onEdit={handleEditExpense}
        />
        <ExpenseForm
          categories={categories}
          onExpenseCreated={handleExpenseUpdated}
          expenseToEdit={expenseToEdit}
        />
      </div>
    </>
  );
}

export default App;
