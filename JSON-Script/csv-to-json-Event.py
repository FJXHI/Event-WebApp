import csv
import json
from datetime import datetime

# Configuration
CSV_FILE = 'JSON-Script/events.csv'
JSON_FILE = 'JSON-Script/performances.json'

# Helpfunction for date formatting
def parse_datetime(dt_str):
    formats = [
        "%d.%m.%Y %H:%M:%S",
        "%d.%m.%Y %H:%M",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d %H:%M",
    ]
    for fmt in formats:
        try:
            dt = datetime.strptime(dt_str.strip(), fmt)
            return dt.strftime("%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            continue
    return "" 

def convert_events_csv_to_json(csv_file, json_file):
    events = []

    with open(csv_file, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=';')

        for row in reader:
            # date_str = row.get("date", "") # Calculate date from start_time
            ticket_bool = row.get("ticket", "false").lower() == "true"

            event = {
                "id": int(row.get("id", 0)),
                "actsIDArr": [int(id.strip()) for id in row.get("actsArr", "").split(',') if id.strip()],
                "stageID": int(row.get("stageID", 0)),
                "id-name": row.get("id-name") or None,
                "name": row.get("name", ""),
                # "short-description": None, # Not in use
                "description": row.get("description", ""),
                "start_time": parse_datetime(row.get("start_time", "")),
                "end_time": parse_datetime(row.get("end_time", "")),
                "date": parse_datetime(row.get("start_time", ""))[:10] if row.get("start_time") else "",
                # "date": datetime.strptime(date_str, "%d.%m.%Y").strftime("%Y-%m-%d") if date_str else "", # Calculate date from start_time
                "status": row.get("status", "active"),
                "type": row.get("type", ""),
                "tags": [tag.strip() for tag in row.get("tags", "").split(',')],
                "url": row.get("url", ""),
                "ticket": ticket_bool
            }

            # ticket_info, only if ticket is true
            # Not in use at the moment
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
    print(f"JSON successfully created: {json_file}")

convert_events_csv_to_json(CSV_FILE, JSON_FILE)
