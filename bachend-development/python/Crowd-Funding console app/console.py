from validate_input import valid_email, validate_not_empty, validate_password, validate_phone
from add_item import add_item_to_file
from file_helpers import read_file

def register():
    first_name = input("enter first name: ")
    last_name = input("enter last name: ")
    
    email = input("enter email: ")
    while not valid_email(email):
        print("not a valid email")
        email = input("enter email: ")
        
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
        
    data = {
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
    
    users = read_file("users.json")
    found_user = ""
    for user in users:
        if user["email"] == email and user["password"] == password:
            print("successfully logged in")
            found_user = user
    if not found_user:
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
        
        