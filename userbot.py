from telethon import TelegramClient, events
import logging
import re

# -------------------- LOGGING --------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("userbot")

# -------------------- TELEGRAM CREDS --------------------
API_ID = 25380512
API_HASH = "ceaebc1277dcba1ca89b753e3f646e88"

SESSION_NAME = "userbot_session"

# -------------------- CHANNELS --------------------
# ✅ ORIGINAL SOURCE CHANNELS (UNCHANGED)
# ✅ PLUS your own channel added
# ❌ NO random channels

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

    # ➕ your own channel
    -1002331799520
]

# Destination = your private channel
DESTINATION_CHANNEL = -1002331799520

# -------------------- CLIENT --------------------
client = TelegramClient(SESSION_NAME, API_ID, API_HASH)

# -------------------- REGEX --------------------
PRICE_REGEX = re.compile(r"₹\s*([\d,]+)")
AMAZON_REGEX = re.compile(
    r"(https?://(?:amzn\.to|www\.amazon\.in|amazon\.in)[^\s]+)",
    re.IGNORECASE
)

# -------------------- PARSERS --------------------
def extract_price(text: str):
    match = PRICE_REGEX.search(text)
    if not match:
        return None
    return int(match.group(1).replace(",", ""))

def extract_amazon_link(text: str):
    match = AMAZON_REGEX.search(text)
    if not match:
        return None
    return match.group(1)

def extract_title(text: str):
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    return lines[0] if lines else None

# -------------------- EVENT HANDLER --------------------
@client.on(events.NewMessage(chats=SOURCE_CHANNELS))
async def deal_listener(event):
    text = event.raw_text or ""

    title = extract_title(text)
    price = extract_price(text)
    link = extract_amazon_link(text)

    if not title or not price or not link:
        logger.info("Ignored: missing price or Amazon link")
        return

    logger.info("Deal detected")
    logger.info(f"Title: {title}")
    logger.info(f"Price: ₹{price}")
    logger.info(f"Link: {link}")

    message = (
        f"🔥 *Deal Alert*\n\n"
        f"*{title}*\n"
        f"💰 Price: ₹{price}\n"
        f"🛒 {link}\n\n"
        f"_As an Amazon Associate, we earn from qualifying purchases._"
    )

    await client.send_message(
        DESTINATION_CHANNEL,
        message,
        link_preview=True
    )

    logger.info("Deal forwarded successfully")

# -------------------- START --------------------
def main():
    logger.info("Userbot running in TEST MODE")
    client.start()
    client.run_until_disconnected()

if __name__ == "__main__":
    main()
