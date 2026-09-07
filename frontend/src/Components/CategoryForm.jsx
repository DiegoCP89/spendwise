import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const CategoryForm = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    if (!name) {
      setErrorMessage("Category name is required.");
      return;
    }
    try {
      await axios.post(`${API_URL}/categories/`, { name: name });
      setName("");
      setErrorMessage("");
      onCategoryCreated();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Could not create category.",
      );
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">Add Category</h2>
      <div className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Category Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ex: Food, Transport, Health"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
