import json

def add_new_row_to_json():
    # User input for file selection
    file_choice = input("Enter '1' to add to roadmap-data.json, '2' to add to INI-settings.json: ")

    if file_choice == '1':
        file_path = 'docs/bettercosmetics/roadmap-data.json'
        entry_fields = [
            ("date", "Enter Date: "),
            ("feature", "Enter Feature: "),
            ("version", "Enter Version: "),
            ("notes", "Enter Notes: "),
            ("status", "Enter Status (P/I/C): ")
        ]
    else:
        file_path = 'docs/bettercosmetics/INI-settings.json'
        entry_fields = [
            ("description", "Enter Description: "),
            ("key", "Enter Key: "),
            ("value", "Enter Value: ")
        ]

    try:
        with open(file_path, 'r') as file:
            if file_choice == '1':
                data = json.load(file)
                last_id = int(data[-1]['id']) if data else 0
            else:
                content = json.load(file)
                data = content["settings"]
                last_id = int(data[-1]['id']) if data else -1  # Start from -1 if empty

        new_id = str(last_id + 1)

        # New entry
        new_entry = {"id": new_id}
        for field, message in entry_fields:
            new_entry[field] = input(message)

        # Append the new entry
        data.append(new_entry)

        # Write back to the JSON file
        with open(file_path, 'w') as file:
            if file_choice == '1':
                json.dump(data, file, indent=4)
            else:
                content["settings"] = data
                json.dump(content, file, indent=4)

        print("New row added successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")

# Call the function without a file path
add_new_row_to_json()
