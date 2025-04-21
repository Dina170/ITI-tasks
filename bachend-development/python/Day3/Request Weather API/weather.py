import requests

def get_current_temperature(city):
    r = requests.get(f'http://api.weatherapi.com/v1/current.json?key=af1b64cb78ea4de0a34173742252104&q={city}')
    data = r.json()
    print(f'temp: {data.get("current").get("temp_c")}')
    
    
get_current_temperature('Mansoura')