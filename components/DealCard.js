export default function DealCard({ deal }) {
  return (
    <div className="deal-card">
      <h3>{deal.title}</h3>
      <p className="price">{deal.price}</p>

      <a
        href={deal.url}
        target="_blank"
        rel="nofollow noopener"
        className="buy-btn"
      >
        Buy Now
      </a>
    </div>
  );
}
