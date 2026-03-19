import { Redis } from "@upstash/redis";

// Use EXISTING Vercel KV env variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, price, link, image } = req.body;

    // Validation (the thing that broke your entire life earlier)
    if (!title || !price || !link) {
      return res.status(400).json({ error: "Invalid deal payload" });
    }

    const deal = {
      id: Date.now().toString(),
      title,
      price,
      link,
      image: image || "",
      createdAt: new Date().toISOString(),
    };

    // Save deal
    await redis.lpush("deals", JSON.stringify(deal));

    // Keep only latest 100
    await redis.ltrim("deals", 0, 99);

    return res.status(200).json({
      success: true,
      deal,
    });

  } catch (err) {
    console.error("API ERROR:", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}