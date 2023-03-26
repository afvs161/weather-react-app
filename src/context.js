import { createContext, useEffect, useReducer } from "react"
import { get_city_name, get_weather_info } from "./config"
import weatherReducer from "./reducer"

export const WeatherContext = createContext()
let state = {
	weatherInfo: {},
	hour: 0,
	bgImg: null,
	location: "",
	loading: false,
}

export default function WeatherProvider({ children }) {
	const [value, dispatch] = useReducer(weatherReducer, state)

	value.getHour = (offset) => {
		dispatch({ type: "get_hour", payload: offset })
	}

	useEffect(() => {
		dispatch({ type: "day_night", payload: state.hour })
	}, [state.hour])

	useEffect(() => {
		state.loading = true
		const success = (position) => {
			const latitude = position.coords.latitude
			const longitude = position.coords.longitude

			fetch(get_city_name(latitude, longitude))
				.then((res) => res.json())
				.then((city) => {
					fetch(get_weather_info(city.city))
						.then((res) => res.json())
						.then((data) => {
							state.weatherInfo = data
							value.getHour(data.timezone / 60 / 60)
						})
				})
		}
		console.log(state.weatherInfo)

		navigator.geolocation.getCurrentPosition(success, (err) =>
			console.error(err)
		)
		state.loading = false
	}, [])

	return (
		<WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
	)
}
