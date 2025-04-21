my_str = "abdulrahman"

longestStr = ""
str = my_str[0]

for i in range(1, len(my_str)):
    if my_str[i] >= my_str[i-1]:
        str += my_str[i]
    else:
        if (len(str) > len(longestStr)):
            longestStr = str;
        str = my_str[i]

print(longestStr)