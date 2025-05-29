import csv
import json
import os

# Configuration
CSV_FILE = 'JSON-Script/acts.csv'
JSON_FILE = 'JSON-Script/acts.json'

def parse_tags(cell):
    # Parse tags from a cell string formatted as (name,visible) or just (name)
    # Example: (electro,false),(rock) -> [{'name': 'Electro', 'visible': False}, {'name': 'Rock', 'visible': True}]
    tags = []
    try:
        if not cell:
            return []
        for pair in cell.strip().split('),('):
            clean = pair.strip('()')
            parts = list(map(str.strip, clean.split(',', 1)))
            name = parts[0].capitalize()
            visible = True  # default
            if len(parts) == 2:
                visible = parts[1].lower() == 'true'
            tags.append({
                "name": name,
                "visible": visible
            })
    except Exception as e:
        print(f"Error parsing tags", e)
    return tags


def parse_weblinks(cell):
    # Parse web links from a cell string formatted as (name,url),(name,url)...
    links = []
    try:
        if not cell:
            return []
        for pair in cell.strip().split('),('):
            clean = pair.strip('()')
            if ',' in clean:
                name, url = map(str.strip, clean.split(',', 1))
                links.append({
                    "name": name,
                    "url": url
                })
    except Exception as e:
        print(f"Error parsing web links:", e)
    return links

def convert_acts_csv_to_json(csv_file, json_file):
    acts = []

    with open(csv_file, mode='r', encoding='utf-8', newline='') as file:
        reader = csv.DictReader(file, delimiter=';')

        for row in reader:
            act_types = [a.strip() for a in row.get("act-type", "").split(',') if a.strip()]
            tags = parse_tags(row.get("tages", ""))
            weblinks = parse_weblinks(row.get("weblinks", ""))

            act = {
                "id": int(row.get("id", 0)),
                "id-name": row.get("id-name") or None,
                "name": row.get("name", "").strip(),
                "subname": row.get("subname", "").strip(),
                "act-type": act_types,
                # "short-description": None, # Not in use
                "description": row.get("description", "").strip(),
                "image": row.get("image", "").strip() or None,
                "tags": tags,
                "weblinks": weblinks
            }

            acts.append(act)

    with open(json_file, mode='w', encoding='utf-8') as file:
        json.dump(acts, file, indent=2, ensure_ascii=False)
    print(f"JSON successfully created: {json_file}")

if __name__ == "__main__":
    convert_acts_csv_to_json(CSV_FILE, JSON_FILE)
