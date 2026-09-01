import os
import json

ROOT = "files"


def generate_index(folder):

    items = []

    try:
        names = sorted(
            os.listdir(folder),
            key=str.lower
        )
    except OSError as e:
        print("ERROR:", folder, e)
        return

    for name in names:

        if name == "index.json":
            continue

        path = os.path.join(folder, name)

        # Folder
        if os.path.isdir(path):

            items.append({
                "name": name,
                "type": "folder"
            })

        # File
        elif os.path.isfile(path):

            items.append({
                "name": name,
                "type": "file",
                "size": os.path.getsize(path)
            })

    index_path = os.path.join(
        folder,
        "index.json"
    )

    try:

        with open(
            index_path,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(
                items,
                f,
                indent=2,
                ensure_ascii=False
            )

        print("Created:", index_path)

    except OSError as e:

        print(
            "ERROR writing:",
            index_path,
            e
        )


# Generate index.json for every directory
for root, dirs, files in os.walk(ROOT):

    generate_index(root)

print("\nAll index.json files generated successfully.")