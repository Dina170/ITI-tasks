while True:
    name = input("enter name: ").strip()
    if not name:
        print("empty")
    elif not name.isalpha():
        print("name can't be number");
    else:
        email = input("enter email: ").strip()
        break
        

# /\w+@\w+\.\w{2,4}/
# '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$