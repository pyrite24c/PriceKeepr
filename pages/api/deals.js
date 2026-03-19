import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const SECRET = process.env.DEAL_SECRET;

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {

      // 🔐 AUTH CHECK
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
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("POST DEAL ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}