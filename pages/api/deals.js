import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const SECRET = process.env.DEAL_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const auth = req.headers.authorization;

    if (auth !== `Bearer ${SECRET}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, price, link, image } = req.body;

    if (!title || !price || !link) {
      return res.status(400).json({ error: "Invalid deal payload" });
    }

    if (!link.includes("amazon.") && !link.includes("amzn.to")) {
      return res.status(400).json({ error: "Invalid Amazon link" });
    }

    const deal = {
      id: Date.now().toString(),
      title,
      price,
      link,
      image: image || "",
      createdAt: new Date().toISOString(),
    };

    await redis.lpush("deals", JSON.stringify(deal));
    await redis.ltrim("deals", 0, 99);

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}