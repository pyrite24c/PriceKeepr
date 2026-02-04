from telethon import TelegramClient, events
import requests
import re
import logging

API_ID = 25380512
API_HASH = "ceaebc1277dcba1ca89b753e3f646e88"

SOURCE_CHANNELS = [
    -1001687325075,
    -1001192989118,
    -1001266052687,
    -1001332756990,
    -1002393042058,
    -1001707571730,
    -1001391583159,
    -1001407365889,
    -1001396852404,
    -1001412868909,
    -1001388213936,
    -1001326994322,
    -1002331799520  # your own channel (allowed)
]

DESTINATION_CHANNEL = -1002331799520

SITE_API = "https://pricekeepr.online/api/deals"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("userbot")

client = TelegramClient("userbot_session", API_ID, API_HASH)

def extract_price(text):
    match = re.search(r"₹\s?[\d,]+", text)
    return match.group(0) if match else None

def extract_amazon_link(text):
    match = re.search(r"https?://(amzn\.to|www\.amazon\.in)\S+", text)
    return match.group(0) if match else None

@client.on(events.NewMessage(chats=SOURCE_CHANNELS))
async def handler(event):
    text = event.raw_text or ""

    price = extract_price(text)
    link = extract_amazon_link(text)

    if not price or not link:
        logger.info("Ignored: missing price or Amazon link")
        return

    title = text.split("\n")[0].strip()

    payload = {
        "title": title,
        "price": price,
        "link": link,
        "image": "",  # Amazon preview image is enough
        "category": "Deals"
    }

    try:
        r = requests.post(SITE_API, json=payload, timeout=10)
        if r.status_code == 200:
            logger.info(f"Deal pushed to site: {title}")
        else:
            logger.error(f"Site rejected deal: {r.text}")
    except Exception as e:
        logger.error(f"POST failed: {e}")

    await event.forward_to(DESTINATION_CHANNEL)

client.start()
logger.info("Userbot running")
client.run_until_disconnected()
