from file_helpers import read_file, write_file

def add_item_to_file(data, file):
    try:
        items = read_file(file)
    except FileNotFoundError:
        items = []
    items.append(data);
    write_file(file, items);
    
if __name__ == "__main__":
    add_item_to_file({"email": "test2", "pass": "1596"}, "users.json");