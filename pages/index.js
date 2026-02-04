import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [deals, setDeals] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/deals");
      const data = await res.json();
      setDeals(data);

      data.forEach(async (deal) => {
        const og = await fetch(
          `/api/og?url=${encodeURIComponent(deal.link)}`
        ).then(r => r.json());

        setImages(prev => ({
          ...prev,
          [deal.link]: og.image
        }));
      });
    }

    load();
  }, []);

  return (
    <main className="container">
      <h1>Latest Deals</h1>

      <div className="deals">
        {deals.map((d, i) => (
          <div className="deal-card" key={i}>
            {images[d.link] && (
              <img src={images[d.link]} className="deal-image" />
            )}
            <h2>{d.title}</h2>
            <p className="price">{d.price}</p>
            <a href={d.link} target="_blank">View on Amazon</a>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
