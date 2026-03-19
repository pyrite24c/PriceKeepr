import { useEffect, useState } from "react";

export default function Home() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch("/api/getDeals")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDeals(data);
        } else {
          console.error("Invalid data:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 Latest Deals</h1>

      {deals.length === 0 && <p>No deals yet</p>}

      {Array.isArray(deals) &&
        deals.map((deal) => (
          <div
            key={deal.id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 15,
              borderRadius: 10,
            }}
          >
            <img
              src={deal.image || "https://via.placeholder.com/300"}
              alt={deal.title}
              style={{ width: "100%", borderRadius: 10 }}
            />

            <h3>{deal.title || "No title"}</h3>

            <p style={{ fontWeight: "bold" }}>
              {deal.price || "Price not available"}
            </p>

            <a href={deal.link} target="_blank" rel="noopener noreferrer">
              View Deal
            </a>
          </div>
        ))}
    </div>
  );
}