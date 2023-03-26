import { useContext, useEffect, useState } from "react"
import { WeatherContext } from "./context"

function App() {
	const { weatherInfo, hour, bgImg, location, loading } =
		useContext(WeatherContext)

	const [value, setValue] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	useEffect(() => {
		console.log(weatherInfo)
	}, [])

	return (
		<div
			className="font-mono max-w-sm mx-auto min-h-screen relative text-white pt-8 px-4"
			style={{
				backgroundImage: `url(${bgImg})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<form className="text-center mb-4" onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					placeholder={loading ? "Getting location" : "Enter location"}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="mx-auto text-xl bg-slate-200 bg-opacity-20 border-2 border-slate-300 capitalize outline-none p-1 rounded-xl border-opacity-70"
				/>
			</form>
			<div className="relative">
				<div>
					<p className="text-3xl font-semibold drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
						{loading
							? "..."
							: weatherInfo.name
							? weatherInfo.name
							: "City not found"}
						<span className="text-sm">
							{" "}
							{weatherInfo.sys && weatherInfo.sys.country}
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
			<div className="absolute bottom-16 p-5 flex justify-around text-center bg-slate-400 bg-opacity-30 rounded-xl w-11/12 -translate-x-1/2 left-1/2">
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
						{weatherInfo.wind && weatherInfo.wind.speed.toFixed(1)} KMH
					</span>
					<p className="text-md drop-shadow-[1px_5px_5px_rgba(0,0,0,0.25)] shadow-black">
						Wind Speed
					</p>
				</div>
			</div>
		</div>
	)
}

export default App
