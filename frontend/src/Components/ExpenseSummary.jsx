const ExpenseSummary = ({ expenses }) => {
  const total = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0,
  );

  return (
    <div>
      <p>Total: ${total}</p>
    </div>
  );
};

export default ExpenseSummary;
