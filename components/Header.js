import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        {/* LEFT: menu button */}
        <button
          className="menu-btn"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* CENTER: logo */}
        <div className="logo-wrap">
          <img src="/logo.png" alt="PriceKeepr" className="logo" />
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}