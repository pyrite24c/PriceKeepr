import re
import asyncio
import logging
import requests
from telethon import TelegramClient, events

API_ID = 25380512
API_HASH = "YOUR_API_HASH"

SOURCE_CHANNELS = [
    -1001687325075,
    -1002331799520
]

DESTINATION_CHANNELS = [
    -1002331799520
]

SITE_API = "https://pricekeepr.online/api/deals"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("userbot")

price_regex = re.compile(r"₹\s?[\d,]+")
amazon_link_regex = re.compile(r"(https?://(?:www\.)?(?:amazon\.|amzn\.to)[^\s]+)")

client = TelegramClient("userbot", API_ID, API_HASH)

@client.on(events.NewMessage(chats=SOURCE_CHANNELS))
async def handler(event):
    text = event.raw_text or ""

    price_match = price_regex.search(text)
    link_match = amazon_link_regex.search(text)

    if not price_match or not link_match:
        logger.info("Ignored: missing price or Amazon link")
        return

    title = text.split("\n")[0][:120]
    price = price_match.group()
    link = link_match.group()

    image = None
    if event.message.media:
        image = "https://via.placeholder.com/300"  # optional later upgrade

    payload = {
        "title": title,
        "price": price,
        "link": link,
        "image": image,
        "category": "Deals"
    }

    try:
        r = requests.post(SITE_API, json=payload, timeout=10)
        if r.status_code == 200:
            logger.info("Deal pushed to site")
        else:
            logger.error(f"Site rejected deal: {r.text}")
    except Exception as e:
        logger.error(f"POST failed: {e}")

async def main():
    await client.start()
    logger.info("Userbot running")
    await client.run_until_disconnected()

asyncio.run(main())
