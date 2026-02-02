export default function DealCard({ deal }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        width: 320
      }}
    >
      <img
        src={deal.image}
        alt={deal.title}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
        }}
        style={{
          width: "100%",
          height: 180,
          objectFit: "contain",
          marginBottom: 10
        }}
      />

      <h3>{deal.title}</h3>
      <p style={{ fontWeight: "bold" }}>{deal.price}</p>

      <a
        href={deal.link}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          marginTop: 10,
          textAlign: "center",
          background: "#2563eb",
          color: "white",
          padding: "10px 0",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Buy Now
      </a>
    </div>
  );
}
