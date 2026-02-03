export default function MobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="menu-overlay" onClick={onClose} />

      {/* LEFT SLIDE MENU */}
      <aside className="mobile-menu">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h3>Categories</h3>

        <ul>
          <li>Mobiles & Accessories</li>
          <li>Electronics</li>
          <li>Computers & Accessories</li>
          <li>Home & Kitchen</li>
          <li>Fashion</li>
          <li>Beauty & Personal Care</li>
          <li>Grocery & Gourmet Food</li>
          <li>Books</li>
          <li>Toys & Games</li>
        </ul>

        <hr />

        <ul>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
          <li>Affiliate Disclosure</li>
        </ul>
      </aside>
    </>
  );
}