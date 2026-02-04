import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "deals.json");

export default function handler(req, res) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }

  let deals = [];
  try {
    deals = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    deals = [];
  }

  if (req.method === "GET") {
    return res.status(200).json(deals);
  }

  if (req.method === "POST") {
    const { title, price, image, link, category } = req.body;

    // ✅ FIXED validation
    if (
      !title ||
      !price ||
      !link ||
      !/amazon\.|amzn\.to/.test(link)
    ) {
      return res.status(400).json({ error: "Invalid deal payload" });
    }

    const newDeal = {
      id: Date.now(),
      title,
      price,
      image: image || "",
      link,
      category: category || "Deals",
      createdAt: new Date().toISOString()
    };

    deals.unshift(newDeal);
    deals = deals.slice(0, 100);

    fs.writeFileSync(filePath, JSON.stringify(deals, null, 2));

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
