import requests

def get_current_temperature(city):
    r = requests.get(f'http://api.weatherapi.com/v1/current.json?key=af1b64cb78ea4de0a34173742252104&q={city}')
    data = r.json()
    print(f'temp: {data.get("current").get("temp_c")}')
    
    
def get_temperature_after(city, days, hour=None):
    r = requests.get(f'http://api.weatherapi.com/v1/forecast.json?key=af1b64cb78ea4de0a34173742252104&q={city}&days={days}&hour={hour}')
    data = r.json().get("forecast").get("forecastday")
    
    temps = [{day.get("date"): day.get("hour")[0].get("temp_c")} for day in data]
    print(f'temp: {temps}')
    
    
def get_lat_and_long(city):
    r = requests.get(f'http://api.weatherapi.com/v1/forecast.json?key=af1b64cb78ea4de0a34173742252104&q={city}')
    data = r.json().get("location")
    
    print(f'lat: {data.get("lat")}, lon: {data.get("lon")}')
    
# get_current_temperature('Mansoura')
# get_temperature_after("Mansoura", 5, 6)
get_lat_and_long("Mansoura")