import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmModal from "./components/ConfirmModal";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("spendwise_token"));
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
        localStorage.removeItem("spendwise_token");
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
    localStorage.setItem("spendwise_token", receivedToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
    fetchExpenses();
    fetchCategories();
  }

  function handleCategoryCreated() {
    fetchCategories();
  }

  function handleDeleteCategory(id) {
    setModalConfig({
      message:
        "Are you sure you want to delete this category? This action cannot be undone.",
      onConfirm: async () => {
        try {
          await axios.delete(`${API_URL}/categories/${id}/`);
          fetchCategories();
        } catch (error) {
          alert(error.response?.data?.detail || "Could not delete category.");
        }
        setModalConfig(null);
      },
    });
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("spendwise_token");
    if (savedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
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
        <CategoryList categories={categories} onDelete={handleDeleteCategory} />
        <CategoryForm onCategoryCreated={handleCategoryCreated} />
      </div>
    </>
  );
}

export default App;
