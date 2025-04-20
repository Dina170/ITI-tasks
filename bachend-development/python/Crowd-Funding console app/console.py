from validate_input import valid_email, validate_not_empty, validate_password, validate_phone
from add_item import add_item_to_file
from file_helpers import read_file
from project_crud import add_project, edit_project, delete_project, view_projects

def check_email_exists(email):
    users = read_file("users.json")    
    for user in users:
        if user["email"] == email:
            return user

def register():
    first_name = input("enter first name: ")
    last_name = input("enter last name: ")
    
    while True:
        email = input("enter email: ")
        if not valid_email(email):
            print("not a valid email")
        
        elif check_email_exists(email):
            print("email already exists")
        
        else:            
            break
    
    password = input("enter password: ")
    error = validate_password(password)
    while error:
        print(error)
        password = input("enter password: ")
        error = validate_password(password)
        
    confirm_password = input("confirm password: ")
    while password != confirm_password:
        print("confirm password doesn't match")
        confirm_password = input("confirm password: ")
        
    phone = input("enter phone number: ")
    while not validate_phone(phone):
        print("not a valid phone number")
        phone = input("enter phone number: ")
        
    users = read_file("users.json")    
        
    data = {
        "id": users[-1]["id"] + 1 if users else 1,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "phone": phone
    }
    empty = validate_not_empty(data)
    if empty:
        print(f"{empty} is required")
    else:
        add_item_to_file(data, "users.json")
        

def login():
    email = input("enter email: ")
    while not valid_email(email):
        print("not a valid email")
        email = input("enter email: ")
        
    password = input("enter password: ")
    
    found_user = check_email_exists(email)
    
    if found_user and found_user["password"] == password:
        print("successfully logged in")    
        print("1. view projects")
        print("2. add project")
        print("3. edit project")
        print("4. delete project")
        selection = input("enter number: ")
        if selection == "1":
            view_projects()
        elif selection == "2":
            add_project(found_user["id"]);
        elif selection == "3":
            edit_project();
        elif selection == "4":
            delete_project();
        else:
            selection = ""
            print("not valid number")
    else:
        print("not a valid user")
            

while True:
    print("1. Register")
    print("2. Login")
    selection = input("enter number: ")

    if selection == "1":
        register()
    elif selection == "2":
        login();
    else:
        selection = ""
        print("not valid number")

