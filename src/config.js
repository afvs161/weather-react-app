const api_url = "https://api.openweathermap.org/data/2.5/weather"
const api_key = "ea25ca6027351a9b811d59aa7e67ddb7"

const get_weather_info = (x) => {
	return `${api_url}?q=${x}&appid=${api_key}&units=metric`
}

const get_city_name = (latitude, longitude) => {
	return `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
}

export { api_url, api_key, get_weather_info, get_city_name }
