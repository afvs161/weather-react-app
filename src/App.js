import { useContext, useEffect, useState } from "react"
import { WeatherContext } from "./context"

function App() {
	const {
		weatherInfo,
		hour,
		bgImg,
		location,
		loading,
		dayNight,
		search,
		getDirection,
		direction,
		arrow,
		setArrow,
	} = useContext(WeatherContext)
  const [value, setValue] = useState("")
  let cityDate = new Date(new Date().getTime() + (weatherInfo.timezone / 60 / 60) * 3600 * 1000)
							.toUTCString()
							.replace(/ GMT$/, "")

	useEffect(() => {
		setArrow(direction)
	}, [weatherInfo])

	useEffect(() => {
		dayNight(hour)
	}, [hour])

	const handleSubmit = (e) => {
		e.preventDefault()
		search(value)
	}

	return (
		<div
			className="font-mono grid max-w-sm mx-auto min-h-screen relative text-white pt-4"
			style={{
				backgroundImage: `url(${bgImg})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				gridTemplateRows: "100vh auto",
			}}
		>
			<div
				className="px-4 pb-8 grid"
				style={{
					gridTemplateRows: "60px 72vh 100px",
				}}
			>
				{/* form */}
				<form className="text-center mb-4" onSubmit={(e) => handleSubmit(e)}>
					<input
						type="text"
						placeholder={loading ? "Getting location" : "Enter location"}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						className="mx-auto text-xl bg-slate-200 bg-opacity-20 border-2 border-slate-300 capitalize outline-none p-1 rounded-xl border-opacity-70"
					/>
				</form>

				{/* top */}
				<div className="relative">
					<h2 className="text-lg drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
						{cityDate.slice(5, 11)}, {cityDate.slice(17, 22)}
					</h2>
					<div>
						<p className="text-3xl font-semibold drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
							{loading
								? "..."
								: weatherInfo.name
								? weatherInfo.name
								: "City not found"}
							<span className="text-sm">
								{" "}
								{loading || (weatherInfo.sys && weatherInfo.sys.country)}
							</span>
						</p>
						<h1 className="text-7xl font-bold drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
							{weatherInfo.main && weatherInfo.main.temp.toFixed(0)}°C
						</h1>
					</div>
					<p className="rotate-90 absolute -right-5 top-24 text-xl drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
						{weatherInfo.weather && weatherInfo.weather[0].main}
					</p>
				</div>

				{/* middle */}
				<div className="mx-auto [word-spacing:-5px] p-5 flex justify-around text-center bg-slate-400 bg-opacity-30 rounded-xl w-11/12">
					<div>
						<span className="text-2xl drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
							{weatherInfo.main && weatherInfo.main.feels_like.toFixed(0)}°C
						</span>
						<p className="text-md drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
							Feels Like
						</p>
					</div>
					<div>
						<span className="text-2xl drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
							{weatherInfo.main && weatherInfo.main.humidity}%
						</span>
						<p className="text-md drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
							Humidity
						</p>
					</div>
					<div>
						<span className="text-2xl tracking-tighter drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
							{weatherInfo.wind && weatherInfo.wind.speed.toFixed(1)}
							<span className="text-lg">km/h</span>
						</span>
						<p className="text-md drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
							Wind Speed
						</p>
					</div>
				</div>
			</div>

			{/* bottom */}
			<div className="bg-emerald-50 [word-spacing:-5px] text-slate-600 w-full px-4 pb-4">
				<p className="capitalize">
					{weatherInfo.weather && weatherInfo.weather[0].description}
				</p>
				<p className="text-lg">
					Pressure: &nbsp; {weatherInfo.main && weatherInfo.main.pressure} mBar
				</p>
				<p className="text-lg">
					Humidity: &nbsp; {weatherInfo.main && weatherInfo.main.humidity} %
				</p>
				<p className="text-lg">
					Visibility: &nbsp; {weatherInfo && weatherInfo.visibility / 1000} km
				</p>
				<hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
				<h3 className="mb-2">Wind</h3>
				<div className="flex gap-3">
					<span className="text-3xl mt-2 flex">
						{weatherInfo.wind && weatherInfo.wind.speed.toFixed(1)}
						&nbsp;
						<div className="flex flex-col">
							<span className="text-xl mx-auto">{arrow}</span>
							<span className="text-sm">km/h</span>
						</div>
					</span>
					<div>
						<p className="text-xl">
							{weatherInfo.wind && weatherInfo.wind.speed < 14
								? "Light"
								: "Heavy"}
						</p>
						<p>From {weatherInfo.wind && direction}</p>
					</div>
				</div>
				<hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
				<h2>sunrise / sunset</h2>
			</div>
		</div>
	)
}

export default App
