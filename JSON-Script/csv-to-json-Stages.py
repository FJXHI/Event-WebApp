import csv
import json

# Configuration
CSV_FILE = 'JSON-Script/stages.csv'
JSON_FILE = 'JSON-Script/stages.json'


def parse_location(cell):
    """Parses location string 'lat, lng' into a float list [lat, lng]"""
    try:
        lat, lng = map(str.strip, cell.split(','))
        return [float(lat), float(lng)]
    except Exception as e:
        print(f"[Warning] Failed to parse location: {cell} → {e}")
        return None


def parse_features(cell):
    """Parses comma-separated feature list and capitalizes"""
    try:
        return [feature.strip().capitalize() for feature in cell.split(',') if feature.strip()]
    except Exception as e:
        print(f"[Warning] Failed to parse features: {cell} → {e}")
        return []


def convert_stages_csv_to_json(csv_file, json_file):
    stages = []

    # Open CSV file with German Windows encoding (e.g., Excel-exported CSVs)
    with open(csv_file, mode='r', encoding='utf-8', newline='') as file:
        reader = csv.DictReader(file, delimiter=';')

        for row in reader:
            stage = {
                "id": int(row.get("id", 0)),
                "id-name": row.get("id-name", "") or None,
                "name": row.get("name", "").strip(),
                # "short-description": None, # Not in use
                "description": row.get("description", "").strip(),
                "image": row.get("image", "").strip() or None,
                "visible": row.get("visible", "false").strip().lower() == "true",
                "type": row.get("type", "").strip(),
                "capacity": int(row.get("capacity", 0)),
                "location": parse_location(row.get("location", "")),
                "address": {
                    "street": row.get("add-street", "").strip(),
                    "postal_code": row.get("zipcode", "").strip(),
                    "city": row.get("city", "").strip(),
                    "country": row.get("country", "").strip()
                },
                "url": row.get("url", "").strip(),
                "features": parse_features(row.get("features", ""))
            }

            stages.append(stage)

    # Write the result as JSON
    with open(json_file, mode='w', encoding='utf-8') as file:
        json.dump(stages, file, indent=2, ensure_ascii=False)

    print(f"JSON successfully created: {json_file}")


if __name__ == "__main__":
    convert_stages_csv_to_json(CSV_FILE, JSON_FILE)
