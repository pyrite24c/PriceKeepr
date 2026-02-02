const categories = [
  "All Deals",
  "Mobiles & Accessories",
  "Electronics",
  "Computers & Accessories",
  "Home & Kitchen",
  "Fashion",
  "Beauty & Personal Care",
  "Grocery & Gourmet Food",
  "Books",
  "Toys & Games"
];

export default function CategoryMenu({ active, setActive }) {
  return (
    <div style={{ display: "flex", gap: 10, overflowX: "auto", marginBottom: 30 }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          style={{
            padding: "8px 14px",
            borderRadius: 20,
            border: "1px solid #ddd",
            background: active === cat ? "#2563eb" : "#f9f9f9",
            color: active === cat ? "white" : "black",
            cursor: "pointer",
            whiteSpace: "nowrap"
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
