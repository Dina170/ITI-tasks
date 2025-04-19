my_str = "dina ebrahim"

count = 0
for i in my_str:
    if i.lower() in ["a", "e", "i", "o", "u"]:
        count += 1

print(count);