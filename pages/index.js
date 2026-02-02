import { useState } from "react";
import deals from "../data/deals.json";
import Header from "../components/Header";
import CategoryMenu from "../components/CategoryMenu";
import DealCard from "../components/DealCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Deals");

  const filteredDeals =
    activeCategory === "All Deals"
      ? deals
      : deals.filter(deal => deal.category === activeCategory);

  return (
    <div style={{ padding: 40 }}>
      <Header />

      <h1>🔥 Latest Deals</h1>

      <CategoryMenu
        active={activeCategory}
        setActive={setActiveCategory}
      />

      {filteredDeals.length === 0 ? (
        <p>No deals in this category.</p>
      ) : (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
}
