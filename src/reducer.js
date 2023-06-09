import day from "./assets/day.jpg"
import night from "./assets/night.jpg"
export default function weatherReducer(state, { type, payload }) {
	switch (type) {
		// get user's time
		case "get_hour": {
			let d = new Date()
			let utcHours = d.getUTCHours()
			let hoursWithOffset = utcHours + payload / 60
			if (hoursWithOffset < 0) {
				hoursWithOffset += 24
			} else if (hoursWithOffset > 23) {
				hoursWithOffset -= 24
			}

			return {
				...state,
				hour: hoursWithOffset,
			}
		}

		// define day or night
		case "day_night": {
			let dn
			if (payload >= 6 && payload < 18) {
				dn = day
			} else {
				dn = night
			}
			return {
				...state,
				bgImg: dn,
			}
		}

		// stop loading
		case "stop_loading": {
			return {
				...state,
				loading: payload,
			}
		}

		// arrow
		case "get_directions": {
			let directions = [
				"North",
				"North-West",
				"West",
				"South-West",
				"South",
				"South-East",
				"East",
				"North-East",
			]
			return {
				...state,
				direction:
					directions[
						Math.round(((payload %= 360) < 0 ? payload + 360 : payload) / 45) %
							8
					],
			}
		}

		case "set_arrow": {
			const define = () => {
				switch (payload) {
					case "North": {
						return "⮛"
					}
					case "North-West": {
						return "↘"
					}
					case "West": {
						return "⮚"
					}
					case "South-West": {
						return "↗"
					}
					case "South": {
						return "⮙"
					}
					case "South-East": {
						return "↖"
					}
					case "East": {
						return "⮘"
					}
					case "North-East": {
						return "↙"
					}

					default:
						return "☼"
				}
			}
			return {
				...state,
				arrow: define(),
			}
		}

		case "get_info": {
			return {
				...state,
				weatherInfo: payload,
			}
		}

		// sunrise, sunset
		case "sunrise_sunset": {
			if (state.weatherInfo.sys) {
				let sunrise = state.weatherInfo.sys.sunrise
				var date = new Date(sunrise * 1000)
				var hours = date.getHours()
				var minutes = "0" + date.getMinutes()
				var formattedTimeSunrise = hours + ":" + minutes.substr(-2)

				let sunset = state.weatherInfo.sys.sunset
				var date = new Date(sunset * 1000)
				var hours = date.getHours()
				var minutes = "0" + date.getMinutes()
				var formattedTimeSunset = hours + ":" + minutes.substr(-2)
			}

			return {
				...state,
				sunrise: formattedTimeSunrise,
				sunset: formattedTimeSunset,
			}
		}

		default:
			return state
	}
}
