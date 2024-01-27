import json

def add_new_row_to_json(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        
        # Assuming the last entry is not a header or comment
        last_id = int(data[-1]['id'])
        new_id = str(last_id + 1)

        # User input for new data
        new_date = input("Enter Date: ")
        new_feature = input("Enter Feature: ")
        new_version = input("Enter Version: ")
        new_notes = input("Enter Notes: ")
        new_status = input("Enter Status (P/I/C): ")

        # New entry
        new_entry = {
            "id": new_id,
            "date": new_date,
            "feature": new_feature,
            "version": new_version,
            "notes": new_notes,
            "status": new_status
        }

        # Append the new entry
        data.append(new_entry)

        # Write back to the JSON file
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)

        print("New row added successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")

# Replace 'your_json_file.json' with the path to your JSON file
add_new_row_to_json('docs/bettercosmetics/roadmap-data.json')
