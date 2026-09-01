import os
import json

ROOT = "files"


def generate_index(folder):
    items = []

    # ---------------------------------
    # READ FOLDER
    # ---------------------------------
    try:
        entries = os.listdir(folder)
    except OSError as error:
        print(f"ERROR reading folder: {folder}")
        print(error)
        return

    # Sort alphabetically
    entries.sort(key=str.lower)

    # ---------------------------------
    # PROCESS EACH ENTRY
    # ---------------------------------
    for name in entries:

        # Never include index.json inside itself
        if name == "index.json":
            continue

        full_path = os.path.join(folder, name)

        # ---------------------------------
        # FOLDER
        # ---------------------------------
        if os.path.isdir(full_path):

            items.append({
                "name": name,
                "type": "folder"
            })

        # ---------------------------------
        # FILE
        # ---------------------------------
        elif os.path.isfile(full_path):

            try:
                size = os.path.getsize(full_path)
            except OSError:
                size = 0

            items.append({
                "name": name,
                "type": "file",
                "size": size
            })

    # ---------------------------------
    # INDEX FILE PATH
    # ---------------------------------
    index_file = os.path.join(
        folder,
        "index.json"
    )

    # ---------------------------------
    # WRITE index.json
    # ---------------------------------
    try:

        with open(
            index_file,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                items,
                file,
                indent=2,
                ensure_ascii=False
            )

        print("UPDATED:", index_file)

    except OSError as error:

        print(f"ERROR writing: {index_file}")
        print(error)


def main():

    # ---------------------------------
    # CHECK FILES FOLDER EXISTS
    # ---------------------------------
    if not os.path.exists(ROOT):

        print(
            f"ERROR: '{ROOT}' folder does not exist."
        )

        return

    # ---------------------------------
    # CHECK IT IS A DIRECTORY
    # ---------------------------------
    if not os.path.isdir(ROOT):

        print(
            f"ERROR: '{ROOT}' is not a directory."
        )

        return

    # ---------------------------------
    # GENERATE ALL INDEX FILES
    # ---------------------------------
    folder_count = 0

    for current_folder, directories, files in os.walk(ROOT):

        generate_index(current_folder)

        folder_count += 1

    # ---------------------------------
    # DONE
    # ---------------------------------
    print()
    print("=" * 60)
    print("ALL INDEX FILES GENERATED SUCCESSFULLY")
    print("=" * 60)
    print(f"Folders processed: {folder_count}")
    print("=" * 60)


# ---------------------------------
# PROGRAM ENTRY POINT
# ---------------------------------
if __name__ == "__main__":
    main()