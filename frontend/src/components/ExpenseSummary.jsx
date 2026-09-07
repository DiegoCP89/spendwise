const ExpenseSummary = ({ expenses }) => {
  const total = expenses
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
    .toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="summary-card">
      <p className="summary-label">Total spending</p>
      <p className="summary-value">{total}</p>
    </div>
  );
};

export default ExpenseSummary;
