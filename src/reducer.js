import day from "./assets/day.jpg"
import night from "./assets/night.jpg"
export default function weatherReducer(state, { type, payload }) {
	switch (type) {
		// get user's time
		case "get_hour": {
			let d = new Date()
			let utcHours = d.getUTCHours()
			let hoursWithOffset = utcHours + payload
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

		default:
			return state
	}
}
