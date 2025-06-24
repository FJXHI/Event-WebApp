import csv
import json
from datetime import datetime
from zoneinfo import ZoneInfo  # Requires Python 3.9+

# Configuration
CSV_FILE = 'JSON-Script/HWevents.csv'
JSON_FILE = 'Event-WebApp/public/data/HWperformances.json'

BERLIN_TZ = ZoneInfo("Europe/Berlin")

# Helpfunction for date formatting: Convert to UTC ISO string
def parse_datetime(dt_str):
    formats = [
        "%d.%m.%Y %H:%M:%S",
        "%d.%m.%Y %H:%M",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d %H:%M",
    ]
    for fmt in formats:
        try:
            # Parse naive datetime (no timezone info)
            dt_naive = datetime.strptime(dt_str.strip(), fmt)
            # Assign Berlin timezone (handles DST)
            dt_berlin = dt_naive.replace(tzinfo=BERLIN_TZ)
            # Convert to UTC and format
            return dt_berlin.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            continue
    return ""

# Replace [ae], [oe], etc. with Umlauts
def replace_umlauts(text):
    if not isinstance(text, str):
        return text
    replacements = {
        "[ae]": "ä", "[oe]": "ö", "[ue]": "ü",
        "[AE]": "Ä", "[OE]": "Ö", "[UE]": "Ü",
        "[sz]": "ß", "[O-]": "Ø", "[o-]": "ø",
    }
    for key, value in replacements.items():
        text = text.replace(key, value)
    return text

# Main converter
def convert_events_csv_to_json(csv_file, json_file):
    events = []

    with open(csv_file, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=';')

        for row in reader:
            ticket_bool = row.get("ticket", "false").lower() == "true"

            start_time_iso = parse_datetime(row.get("start_time", ""))
            end_time_iso = parse_datetime(row.get("end_time", ""))
            date_str = start_time_iso[:10] if start_time_iso else ""

            event = {
                "id": int(row.get("id", 0)),
                "actsIDArr": [int(id.strip()) for id in row.get("actsArr", "").split(',') if id.strip()],
                "stageID": int(row.get("stageID", 0)),
                "id-name": row.get("id-name") or None,
                "name": replace_umlauts(row.get("name", "")),
                "description": replace_umlauts(row.get("description", "")),
                "start_time": start_time_iso,
                "end_time": end_time_iso,
                "date": date_str,
                "status": row.get("status", "active"),
                "type": replace_umlauts(row.get("type", "")),
                "tags": [replace_umlauts(tag.strip()) for tag in row.get("tags", "").split(',')],
                "url": row.get("url", ""),
                "ticket": ticket_bool
            }

            if ticket_bool:
                event["ticket_info"] = {
                    "available": True,
                    "price": 0,
                    "currency": "",
                    "url": ""
                }

            events.append(event)

    with open(json_file, mode='w', encoding='utf-8') as file:
        json.dump(events, file, indent=2, ensure_ascii=False)

    print(f"✅ JSON successfully created: {json_file}")

convert_events_csv_to_json(CSV_FILE, JSON_FILE)
