import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    const deals = await redis.lrange("deals", 0, 99);

    return res.status(200).json({
      success: true,
      deals: deals.map(d => JSON.parse(d)),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch deals" });
  }
}