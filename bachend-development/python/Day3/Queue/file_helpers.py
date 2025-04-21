import json

def read_file(fileName):
    with open(fileName, 'r') as file:
        return json.load(file);
        

def write_file(fileName, data):
    with open(fileName, 'w') as file:
        json.dump(data, file);
        