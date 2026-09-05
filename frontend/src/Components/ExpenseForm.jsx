import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const ExpenseForm = ({ categories, onExpenseCreated, expenseToEdit }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function handleSubmit() {
    if (expenseToEdit) {
      // modo edição — chama PUT
      await axios.put(`${API_URL}/expenses/${expenseToEdit.id}/`, {
        description,
        amount: parseFloat(amount),
        date,
        category_id: parseInt(categoryId),
      });
    } else {
      // modo criação — chama POST
      await axios.post(`${API_URL}/expenses/`, {
        description,
        amount: parseFloat(amount),
        date,
        category_id: parseInt(categoryId),
      });
    }

    setDescription("");
    setAmount("");
    setDate("");
    setCategoryId("");
    onExpenseCreated();
  }

  useEffect(() => {
    if (expenseToEdit) {
      setDescription(expenseToEdit.description);
      setAmount(expenseToEdit.amount);
      setDate(expenseToEdit.date);
      setCategoryId(expenseToEdit.category_id);
    } else {
      setDescription("");
      setAmount("");
      setDate("");
      setCategoryId("");
    }
  }, [expenseToEdit]);

  return (
    <div className="card">
      <h2 className="card-title">
        {expenseToEdit ? "Edit Expense" : "New Expense"}
      </h2>
      <div className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Description</label>
          <input
            className="form-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            className="form-input"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            className="form-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
