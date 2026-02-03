import Head from "next/head";
import Header from "../components/Header";
import DealCard from "../components/DealCard";
import deals from "../data/deals.json";

export default function Home() {
  return (
    <>
      <Head>
        <title>PriceKeepr – Latest Deals</title>
        <meta
          name="description"
          content="Latest Amazon deals and discounts. Updated regularly."
        />
      </Head>

      <Header />

      <main className="container">
        <h1 className="page-title">Latest Deals</h1>

        <div className="deals-grid">
          {deals && deals.length > 0 ? (
            deals.map((deal) => (
              <DealCard
                key={deal.id}
                title={deal.title}
                price={deal.price}
                image={deal.image}   // AMAZON IMAGE URL
                link={deal.link}     // AMAZON PRODUCT URL
              />
            ))
          ) : (
            <p>No deals available.</p>
          )}
        </div>

        <p className="affiliate-note">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>
      </main>
    </>
  );
}