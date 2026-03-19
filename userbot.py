import re
import asyncio
import logging
import requests
from telethon import TelegramClient, events

API_ID = 25380512
API_HASH = "ceaebc1277dcba1ca89b753e3f646e88"

SOURCE_CHANNELS = [
    -1001687325075, -1001192989118, -1001266052687,
    -1001332756990, -1002393042058, -1001707571730,
    -1001391583159, -1001407365889, -1001396852404,
    -1001412868909, -1001388213936, -1001326994322,
    -1002331799520
]

SITE_API = "https://price-keepr.vercel.app/api/deals"
SECRET = "pk_live_7Gk9Xv2QpL4mR8tWc6ZyB3HfN1sD5Ua"

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
        return

    title = text.split("\n")[0][:120]
    price = price_match.group()
    link = link_match.group()

    payload = {
        "title": title,
        "price": price,
        "link": link,
        "image": None
    }

    headers = {
        "Authorization": f"Bearer {SECRET}"
    }

    try:
        r = requests.post(
            SITE_API,
            json=payload,
            headers=headers,
            timeout=10
        )

        print(r.status_code, r.text)

    except Exception as e:
        print(e)

async def main():
    await client.start()
    await client.run_until_disconnected()

asyncio.run(main())