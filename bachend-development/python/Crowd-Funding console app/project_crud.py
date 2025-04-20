from file_helpers import read_file, write_file
from add_item import add_item_to_file
from validate_input import validate_not_empty, validate_date

def search_project(id, projects):
    for project in projects:
        if project["id"] == id:
            return project

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
    while not validate_date(end):
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
    
def edit_project(userId):
    project_id = input("enter project id: ")
    while not project_id.isdigit():
        print("project id must be number")
        project_id = input("enter project id: ")
    project_id = int(project_id)
    
    try:
        projects = read_file("projects.json")
    except FileNotFoundError:
        print("no projects yet")
    else:
        found_project = search_project(project_id, projects)
        if not found_project:
            print("project not found")
            return
            
        if userId != found_project["userId"]:
            print("not authorized")
            return
        
        title = input("enter new title: ") or found_project['title']
        details = input("enter new details: ") or found_project['details']
        
        total_target = input("enter new total target") or str(found_project['total_target'])
        while not total_target.isdigit():
            total_target = input("enter total target: ")
        
        start = input("enter new start time: ") or found_project['start']
        while not validate_date(start):
            start = input("enter start time for the campaign: ")
        
        end = input("enter new end time: ") or found_project['end']
        while not validate_date(end):
            end = input("enter end time for the campaign: ")
        
        found_project.update({
            "title": title,
            "details": details,
            "total_target": int(total_target),
            "start": start,
            "end": end
        })
        
        write_file("projects.json", projects)
        print("project updated successfully")
        
        
def delete_project(userId):
    project_id = input("enter project id: ")
    while not project_id.isdigit():
        print("project id must be number")
        project_id = input("enter project id: ")
    project_id = int(project_id)
    
    try:
        projects = read_file("projects.json")
    except FileNotFoundError:
        print("no projects yet")
    else:
        found_project = search_project(project_id, projects)
        if found_project:
            if userId == found_project["userId"]:
                projects = [project for project in projects if project["id"] != project_id]
                write_file("projects.json", projects)
                print("project deleted successfully")
                
            else:
                print("not authorized")
        else:
            print("project not found")
            
def view_projects(userId):
    try:
        projects = read_file("projects.json")
    except FileNotFoundError:
        print("no projects yet")
    else:
        user_projects = [project for project in projects if project["userId"] == userId]
        print(user_projects)
    
    