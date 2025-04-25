import os
import json

def read_file(filename):
    file_path = os.path.join(os.path.dirname(__file__), filename)
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []
        

def write_file(fileName, data):
    with open(fileName, 'w') as file:
        json.dump(data, file);
        