import math

radius = float(input('enter radius: '))

area = radius * radius * math.pi;
circumference = 2 * radius * math.pi

print(f'area = {round(area, 2)} and circumference = {round(circumference, 2)}')