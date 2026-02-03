export default function DealCard({
  title,
  price,
  image,
  link
}) {
  return (
    <div className="deal-card">
      {/* Image */}
      {image ? (
        <img
          src={image}
          alt={title || "Deal image"}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          style={{
            height: "200px",
            background: "#f3f4f6",
            borderRadius: "8px",
            marginBottom: "12px"
          }}
        />
      )}

      {/* Title */}
      <h3>{title || "Untitled Deal"}</h3>

      {/* Price */}
      <div className="price">{price || ""}</div>

      {/* Buy button */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Buy Now
        </a>
      )}
    </div>
  );
}