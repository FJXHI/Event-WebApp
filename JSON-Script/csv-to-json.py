import csv
import json
import os
from datetime import datetime
from zoneinfo import ZoneInfo  # Requires Python 3.9+

# ==== Konfiguration ====
ACTS_CSV = 'JSON-Script/HWacts.csv'
ACTS_JSON = 'Event-WebApp/public/data/HWacts.json'

EVENTS_CSV = 'JSON-Script/HWevents.csv'
EVENTS_JSON = 'Event-WebApp/public/data/HWperformances.json'

STAGES_CSV = 'JSON-Script/HWstages.csv'
STAGES_JSON = 'Event-WebApp/public/data/HWstages.json'

TIME_ZONE = ZoneInfo("Europe/Berlin")

# ==== Hilfsfunktionen ====

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
    return text.strip()


def parse_tags(cell):
    tags = []
    if not cell:
        return []
    try:
        for pair in cell.strip().split('),('):
            clean = pair.strip('()')
            parts = list(map(str.strip, clean.split(',', 1)))
            name = replace_umlauts(parts[0])
            visible = True
            if len(parts) == 2:
                visible = parts[1].lower() == 'true'
            tags.append({"name": name, "visible": visible})
    except Exception as e:
        print(f"[Fehler] Tags konnten nicht geparst werden: {e}")
    return tags


def parse_weblinks(cell):
    links = []
    if not cell:
        return []
    try:
        for pair in cell.strip().split('),('):
            clean = pair.strip('()')
            if ',' in clean:
                name, url = map(str.strip, clean.split(',', 1))
                links.append({
                    "name": replace_umlauts(name),
                    "url": url
                })
    except Exception as e:
        print(f"[Fehler] Weblinks konnten nicht geparst werden: {e}")
    return links


def parse_datetime(dt_str):
    formats = [
        "%d.%m.%Y %H:%M:%S", "%d.%m.%Y %H:%M",
        "%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M"
    ]
    for fmt in formats:
        try:
            dt_naive = datetime.strptime(dt_str.strip(), fmt)
            dt_berlin = dt_naive.replace(tzinfo=TIME_ZONE)
            return dt_berlin.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            continue
    return ""


def parse_location(cell):
    try:
        lat, lng = map(str.strip, cell.split(','))
        return [float(lat), float(lng)]
    except Exception as e:
        print(f"[Warnung] Ort konnte nicht geparst werden: {cell} → {e}")
        return None


def parse_features(cell):
    try:
        return [replace_umlauts(f.strip()) for f in cell.split(',') if f.strip()]
    except Exception as e:
        print(f"[Warnung] Features konnten nicht geparst werden: {cell} → {e}")
        return []


# ==== Konverterfunktionen ====

def convert_acts():
    acts = []
    with open(ACTS_CSV, mode='r', encoding='utf-8', newline='') as file:
        reader = csv.DictReader(file, delimiter=';')
        for row in reader:
            act_types = [replace_umlauts(a.strip()) for a in row.get("act-type", "").split(',') if a.strip()]
            tags = parse_tags(row.get("tages", ""))
            weblinks = parse_weblinks(row.get("weblinks", ""))
            act = {
                "id": int(row.get("id", 0)),
                "id-name": row.get("id-name") or None,
                "name": replace_umlauts(row.get("name", "")),
                "subname": replace_umlauts(row.get("subname", "")),
                "act-type": act_types,
                "description": replace_umlauts(row.get("description", "")),
                "image": row.get("image", "").strip() or None,
                "tags": tags,
                "weblinks": weblinks
            }
            acts.append(act)

    with open(ACTS_JSON, mode='w', encoding='utf-8') as file:
        json.dump(acts, file, indent=2, ensure_ascii=False)
    print(f"✅ Acts JSON erstellt: {ACTS_JSON}")


def convert_events():
    events = []
    with open(EVENTS_CSV, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=';')
        for row in reader:
            start_time = parse_datetime(row.get("start_time", ""))
            end_time = parse_datetime(row.get("end_time", ""))
            date_str = start_time[:10] if start_time else ""

            ticket_bool = row.get("ticket", "false").lower() == "true"
            event = {
                "id": int(row.get("id", 0)),
                "actsIDArr": [int(a.strip()) for a in row.get("actsArr", "").split(',') if a.strip()],
                "stageID": int(row.get("stageID", 0)),
                "id-name": row.get("id-name") or None,
                "name": replace_umlauts(row.get("name", "")),
                "description": replace_umlauts(row.get("description", "")),
                "start_time": start_time,
                "end_time": end_time,
                "date": date_str,
                "status": row.get("status", "active"),
                "type": replace_umlauts(row.get("type", "")),
                "tags": [replace_umlauts(t.strip()) for t in row.get("tags", "").split(',') if t.strip()],
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

    with open(EVENTS_JSON, mode='w', encoding='utf-8') as file:
        json.dump(events, file, indent=2, ensure_ascii=False)
    print(f"✅ Events JSON erstellt: {EVENTS_JSON}")


def convert_stages():
    stages = []
    with open(STAGES_CSV, mode='r', encoding='utf-8', newline='') as file:
        reader = csv.DictReader(file, delimiter=';')
        for row in reader:
            stage = {
                "id": int(row.get("id", 0)),
                "id-name": row.get("id-name", "") or None,
                "name": replace_umlauts(row.get("name", "")),
                "description": replace_umlauts(row.get("description", "")),
                "image": row.get("image", "").strip() or None,
                "visible": row.get("visible", "false").strip().lower() == "true",
                "type": replace_umlauts(row.get("type", "")),
                "location": parse_location(row.get("location", "")),
                "address": {
                    "street": replace_umlauts(row.get("add-street", "")),
                    "postal_code": row.get("zipcode", "").strip(),
                    "city": replace_umlauts(row.get("city", "")),
                    "country": replace_umlauts(row.get("country", ""))
                },
                "url": row.get("url", "").strip(),
                "features": parse_features(row.get("features", ""))
            }
            stages.append(stage)

    with open(STAGES_JSON, mode='w', encoding='utf-8') as file:
        json.dump(stages, file, indent=2, ensure_ascii=False)
    print(f"✅ Stages JSON erstellt: {STAGES_JSON}")


# ==== Ausführung ====
if __name__ == "__main__":
    convert_acts()
    convert_events()
    convert_stages()
