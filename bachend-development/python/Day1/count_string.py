import re

my_str = "iti test iti in itiiti"

print(my_str.count("iti"))
print(len(re.findall("iti", my_str)))
