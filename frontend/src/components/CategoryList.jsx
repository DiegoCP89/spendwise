const CategoryList = ({ categories, onDelete }) => {
  return (
    <div className="card">
      <h2 className="card-title">Categories</h2>

      {categories.length === 0 ? (
        <p className="empty-state">No categories yet. Add one above.</p>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 1rem",
                borderRadius: "6px",
                border: "1px solid var(--gray-border)",
                backgroundColor: "var(--gray-bg)",
              }}
            >
              <span className="expense-category">{category.name}</span>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(category.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
