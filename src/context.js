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
	direction: "",
	arrow: "☼",
}

export default function WeatherProvider({ children }) {
	const [value, dispatch] = useReducer(weatherReducer, state)

	value.getHour = (offset) => {
		dispatch({ type: "get_hour", payload: offset })
	}

	value.getInfo = (data) => {
		dispatch({ type: "get_info", payload: data })
	}

	value.dayNight = (hour) => {
		dispatch({ type: "day_night", payload: hour })
	}

	value.toggleLoading = (x) => {
		dispatch({ type: "stop_loading", payload: x })
	}

	useEffect(() => {
		state.toggleLoading(true)
		const success = (position) => {
			const latitude = position.coords.latitude
			const longitude = position.coords.longitude

			fetch(get_city_name(latitude, longitude))
				.then((res) => res.json())
				.then((city) => {
					fetch(get_weather_info(city.city))
						.then((res) => res.json())
						.then((data) => {
							value.getInfo(data)
							value.getHour(data.timezone / 60)
							value.getDirection(data.wind.deg)
							state.toggleLoading(false)
						})
				})
		}

		navigator.geolocation.getCurrentPosition(success, (err) =>
			console.error(err)
		)
	}, [])

	value.search = (x) => {
		state.toggleLoading(true)
		fetch(get_weather_info(x))
			.then((res) => res.json())
			.then((data) => {
				value.getInfo(data)
				value.getHour(data.timezone / 60)
				value.getDirection(data.wind.deg)
				state.toggleLoading(false)
			})
	}

	value.getDirection = (angle) => {
		dispatch({ type: "get_directions", payload: angle })
	}

	value.setArrow = (x) => {
		dispatch({ type: "set_arrow", payload: x })
	}

	return (
		<WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
	)
}
