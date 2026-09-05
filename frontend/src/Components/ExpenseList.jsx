const ExpenseList = ({ expenses, categories, onDelete, onEdit }) => {
  return (
    <div className="expense-list">
      {expenses.map((expense) => {
        const category = categories.find((c) => c.id === expense.category_id);
        const categoryName = category ? category.name : "Unknown";

        const formattedAmount = parseFloat(expense.amount).toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" },
        );

        return (
          <div className="expense-item" key={expense.id}>
            <div className="expense-info">
              <p className="expense-description">{expense.description}</p>
              <div className="expense-meta">
                <span className="expense-category">{categoryName}</span>
                <span>{expense.date}</span>
              </div>
            </div>
            <p className="expense-amount">{formattedAmount}</p>
            <div className="expense-actions">
              <button
                className="btn btn-warning"
                onClick={() => onEdit(expense)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
