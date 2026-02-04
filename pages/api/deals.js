// pages/api/deals.js
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { title, price, link, image, category } = req.body;

      // Hard validation
      if (!title || !price || !link) {
        return res.status(400).json({ error: "Invalid deal payload" });
      }

      if (!link.includes("amazon.") && !link.includes("amzn.to")) {
        return res.status(400).json({ error: "Invalid Amazon link" });
      }

      const deal = {
        id: Date.now(),
        title,
        price,
        link,
        image: image || null,
        category: category || "General",
        createdAt: new Date().toISOString()
      };

      // Push to Redis list
      await redis.lpush("deals", deal);

      return res.status(200).json({ success: true });
    }

    if (req.method === "GET") {
      const deals = await redis.lrange("deals", 0, 50);
      return res.status(200).json(deals);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
