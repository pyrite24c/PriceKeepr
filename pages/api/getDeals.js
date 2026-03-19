import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const deals = await redis.lrange("deals", 0, 50);

    // SAFETY: ensure array
    if (!Array.isArray(deals)) {
      return res.status(500).json({ error: "Deals is not array" });
    }

    const parsedDeals = deals.map((item) => {
      try {
        return typeof item === "string" ? JSON.parse(item) : item;
      } catch {
        return null;
      }
    }).filter(Boolean);

    return res.status(200).json(parsedDeals);

  } catch (err) {
    console.error("GET DEALS ERROR:", err);
    return res.status(500).json({ error: "Failed to fetch deals" });
  }
}