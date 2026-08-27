import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseForm from "./components/ExpenseForm";
import Login from "./components/Login";
import Register from "./components/Register";

const API_URL = "http://localhost:8000";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [token, setToken] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  async function fetchExpenses() {
    const response = await axios.get(`${API_URL}/expenses/`);
    setExpenses(response.data);
  }

  async function fetchCategories() {
    const response = await axios.get(`${API_URL}/categories/`);
    setCategories(response.data);
  }

  async function handleDeleteExpense(id) {
    await axios.delete(`${API_URL}/expenses/${id}/`);
    fetchExpenses();
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
    // Configures axios to send token automatically in all requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
    fetchExpenses();
    fetchCategories();
  }

  function handleLogout() {
    setToken(null);
    // Removes the token from axios headers
    delete axios.defaults.headers.common["Authorization"];
  }

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  // Shows register or login screen when not authenticated
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

  // Shows dashboard when authenticated
  return (
    <div>
      <h1>SpendWise</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Expenses</h2>
      <ExpenseList
        expenses={expenses}
        categories={categories}
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense}
      />
      <ExpenseSummary expenses={expenses} />
      <ExpenseForm
        categories={categories}
        onExpenseCreated={handleExpenseUpdated}
        expenseToEdit={expenseToEdit}
      />
    </div>
  );
}

export default App;
