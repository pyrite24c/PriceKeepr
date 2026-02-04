import ogs from "open-graph-scraper";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ image: null });
  }

  try {
    const { result } = await ogs({ url });
    res.status(200).json({
      image: result.ogImage?.url || null
    });
  } catch {
    res.status(500).json({ image: null });
  }
}
