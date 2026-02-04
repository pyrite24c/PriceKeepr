import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "deals.json");

export default function handler(req, res) {
  // Ensure file exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }

  const fileData = fs.readFileSync(filePath, "utf8");
  let deals = [];

  try {
    deals = JSON.parse(fileData);
  } catch {
    deals = [];
  }

  // READ deals
  if (req.method === "GET") {
    return res.status(200).json(deals);
  }

  // WRITE deal (from Telegram bot)
  if (req.method === "POST") {
    const { title, price, image, link, category } = req.body;

    // Hard validation (no garbage allowed)
    if (!title || !price || !link || !link.includes("amazon")) {
      return res.status(400).json({ error: "Invalid deal payload" });
    }

    const newDeal = {
      id: Date.now(),
      title,
      price,
      image: image || "",
      link,
      category: category || "General",
      createdAt: new Date().toISOString()
    };

    deals.unshift(newDeal);

    // Keep only latest 100 deals
    deals = deals.slice(0, 100);

    fs.writeFileSync(filePath, JSON.stringify(deals, null, 2));

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
