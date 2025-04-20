from file_helpers import read_file, write_file
from add_item import add_item_to_file
from validate_input import validate_not_empty, validate_date

def add_project(userId):
    title = input("enter title: ")
    details = input("enter details: ")
    
    total_target = input("enter total target: ")
    while not total_target.isdigit():
        total_target = input("enter total target: ")
        
    start = input("enter start time for the campaign: ")
    while not validate_date(start):
        start = input("enter start time for the campaign: ")
        
    end = input("enter end time for the campaign: ")
    while not validate_date(start):
        end = input("enter end time for the campaign: ")
        
    try:
        projects = read_file("projects.json")
    except FileNotFoundError:
        projects = []
    data = {
        "id": projects[-1]["id"] + 1 if projects else 1,
        "title": title,
        "details": details,
        "total_target": int(total_target),
        "start": start,
        "end": end,
        "userId": userId
    }
    empty = validate_not_empty(data)
    if empty:
        print(f"{empty} is required")
    else:
        add_item_to_file(data, "projects.json")
    
def edit_project():
 pass
def delete_project():
 pass
def view_projects(userId):
    try:
        projects = read_file("projects.json")
    except FileNotFoundError:
        print("no projects yet")
    else:
        user_projects = [project for project in projects if project["userId"] == userId]
        print(user_projects)
    
    