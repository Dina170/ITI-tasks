numbers = [1, 9, 15, 25]

for num in numbers:
    if num % 3 == 0:
        print('fizz', end='')
    if num % 5 == 0:
        print('buzz', end='')
    print(" ")