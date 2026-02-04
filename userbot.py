from telethon import TelegramClient, events
import logging
import re
import json
import os
from datetime import datetime

# ---------------- CONFIG ----------------

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
    -1002331799520   # your own channel ALSO as source
]

DESTINATION_CHANNEL = -1002331799520

DEALS_FILE = "data/deals.json"

# ---------------------------------------

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("userbot")

client = TelegramClient("userbot_session", API_ID, API_HASH)

# Ensure data folder
os.makedirs("data", exist_ok=True)
if not os.path.exists(DEALS_FILE):
    with open(DEALS_FILE, "w") as f:
        json.dump([], f)

# ---------------- HELPERS ----------------

def extract_price(text):
    match = re.search(r"₹\s?\d[\d,]*", text)
    return match.group(0) if match else None

def extract_amazon_link(text):
    match = re.search(r"(https?://(?:amzn\.to|www\.amazon\.in)[^\s]+)", text)
    return match.group(1) if match else None

def extract_title(text):
    lines = text.strip().split("\n")
    return lines[0][:120] if lines else None

def save_deal(deal):
    with open(DEALS_FILE, "r+", encoding="utf-8") as f:
        data = json.load(f)
        if deal["link"] in [d["link"] for d in data]:
            return False
        data.insert(0, deal)
        f.seek(0)
        json.dump(data[:200], f, indent=2)
        f.truncate()
    return True

# ---------------- EVENTS ----------------

@client.on(events.NewMessage(chats=SOURCE_CHANNELS))
async def handler(event):
    text = event.raw_text or ""
    
    price = extract_price(text)
    link = extract_amazon_link(text)
    title = extract_title(text)

    if not price or not link:
        logger.info("Ignored: missing price or Amazon link")
        return

    deal = {
        "title": title,
        "price": price,
        "link": link,
        "createdAt": datetime.utcnow().isoformat()
    }

    if save_deal(deal):
        await client.send_message(
            DESTINATION_CHANNEL,
            f"{title}\n{price}\n{link}"
        )
        logger.info("Deal forwarded successfully")

# ---------------- RUN ----------------

logger.info("Userbot running in TEST MODE")
client.start()
client.run_until_disconnected()
