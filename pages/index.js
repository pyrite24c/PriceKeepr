import fs from "fs";
import path from "path";
import DealCard from "../components/DealCard";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "deals.json");
  const file = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return {
    props: {
      deals: file.deals
    },
    revalidate: 60
  };
}

export default function Home({ deals }) {
  return (
    <main className="container">
      <h1>Latest Deals</h1>

      {deals.length === 0 && <p>No deals yet.</p>}

      <div className="grid">
        {deals.map((deal, i) => (
          <DealCard key={i} deal={deal} />
        ))}
      </div>
    </main>
  );
}
