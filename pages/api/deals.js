import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "deals.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, price, url } = req.body;
  if (!title || !price || !url) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const file = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  // prevent duplicate deals
  if (file.deals.some(d => d.url === url)) {
    return res.status(200).json({ status: "duplicate" });
  }

  file.deals.unshift({
    title,
    price,
    url,
    createdAt: new Date().toISOString()
  });

  fs.writeFileSync(DATA_FILE, JSON.stringify(file, null, 2));
  res.status(200).json({ status: "ok" });
}
