import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseForm from "./components/ExpenseForm";

const API_URL = "http://localhost:8000";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  // State — guarda qual gasto está sendo editado
  const [expenseToEdit, setExpenseToEdit] = useState(null);

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

  // Função — recebe o gasto completo e salva no state
  function handleEditExpense(expense) {
    setExpenseToEdit(expense);
  }

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  function handleExpenseUpdated() {
    setExpenseToEdit(null); // limpa o gasto em edição
    fetchExpenses(); // atualiza a lista
  }

  return (
    <div>
      <h1>SpendWise</h1>
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
