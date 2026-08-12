const ExpenseList = ({ expenses, categories, onDelete, onEdit }) => {
  return (
    <div>
      {expenses.map((expense) => {
        const category = categories.find((c) => c.id === expense.category_id);
        const categoryName = category ? category.name : "Unknown";

        return (
          <div key={expense.id}>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.date}</p>
            <p>{categoryName}</p>
            <button onClick={() => onDelete(expense.id)}>Delete</button>
            <button onClick={() => onEdit(expense)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
