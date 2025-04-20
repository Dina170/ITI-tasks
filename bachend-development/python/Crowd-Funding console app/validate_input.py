import re
import datetime

def validate_not_empty(data):
    for k, v in data.items():
        if not v:
            return k
    return None


def valid_email(email):
    return re.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email)

    
def validate_password(password):
    if len(password) < 8:
        return "password must be at least 8 characters"
    
    elif not re.search("[A-Z]", password):
        return "password must have at least one uppercase letter"
    
    elif not re.search("[a-z]", password):
        return "password must have at least one lowercase letter"
    
    elif not re.search("\d", password):
        return "password must have at least one number"
    
    elif not re.search('[!@#$%^&*(),.?":{}|<>]', password):
        return "password must have at least one special character"
    
    return ""


def validate_phone(phone):
    return re.match("^01[0125][0-9]{8}", phone)

def validate_date(date):
    try:
      return datetime.date.fromisoformat(date)
    except:
      print('Incorrect date format it should be YYYY-MM-DD')

# res = validate_not_empty({"id": 1, "name": ""})
# if res:
#     print(f"{res} is required")
# else:
#     print ("ok")

# res = valid_email("dfgdfg@fdgd.com")
# if res:
#     print(res)
# else:
#     print ("no")

# error = validate_password("dfgdfgA0)ght")
# if error:
#     print(error)
# else:
#     print ("no")

# res = validate_phone("01000250136")
# if res:
#     print(res)
# else:
#     print ("no")

# res = validate_date("2025/09/12")
# if res:
#     print(res)
# else:
#     print ("no")