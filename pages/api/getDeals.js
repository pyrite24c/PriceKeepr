import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const deals = await redis.lrange("deals", 0, 50);

    // 🔥 FIX: parse each deal
    const parsedDeals = deals.map((d) =>
      typeof d === "string" ? JSON.parse(d) : d
    );

    return res.status(200).json(parsedDeals);
  } catch (err) {
    console.error("GET DEALS ERROR:", err);
    return res.status(500).json({ error: "Failed to fetch deals" });
  }
}