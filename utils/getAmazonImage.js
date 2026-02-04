export async function getAmazonImage(url) {
  try {
    const res = await fetch(
      `/api/og?url=${encodeURIComponent(url)}`
    );
    const data = await res.json();
    return data.image || null;
  } catch {
    return null;
  }
}
