name = ""

while True:
    name = input("enter name: ").strip()
    if not name:
        print("empty")
    elif name.isdigit():
        print("name can't be number");
    else:
        email = input("enter email: ").strip()
        break
        