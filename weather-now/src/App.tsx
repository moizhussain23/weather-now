import { useEffect, useMemo, useState } from 'react'
import { WeatherIcon } from './assets/weather-icons'

type GeocodeResult = {
	id: number
	name: string
	latitude: number
	longitude: number
	country?: string
	admin1?: string
};

type CurrentWeather = {
	temperature: number
	windspeed: number
	winddirection: number
	weathercode: number
	time: string
};

type WeatherResponse = {
	current_weather: CurrentWeather
	hourly?: {
		relativehumidity_2m?: number[]
		surface_pressure?: number[]
		cloudcover?: number[]
		temperature_2m?: number[]
		time?: string[]
	}
	daily?: {
		temperature_2m_max?: number[]
		temperature_2m_min?: number[]
		time?: string[]
	}
};

const WEATHER_CODE_MAP: Record<number, string> = {
	0: 'Clear sky',
	1: 'Mainly clear',
	2: 'Partly cloudy',
	3: 'Overcast',
	45: 'Fog',
	48: 'Depositing rime fog',
	51: 'Light drizzle',
	53: 'Moderate drizzle',
	55: 'Dense drizzle',
	56: 'Light freezing drizzle',
	57: 'Dense freezing drizzle',
	61: 'Slight rain',
	63: 'Moderate rain',
	65: 'Heavy rain',
	66: 'Light freezing rain',
	67: 'Heavy freezing rain',
	71: 'Slight snow',
	73: 'Moderate snow',
	75: 'Heavy snow',
	77: 'Snow grains',
	80: 'Slight rain showers',
	81: 'Moderate rain showers',
	82: 'Violent rain showers',
	85: 'Slight snow showers',
	86: 'Heavy snow showers',
	95: 'Thunderstorm',
	96: 'Thunderstorm with slight hail',
	99: 'Thunderstorm with heavy hail',
};

function formatPlace(place: GeocodeResult): string {
	const region = place.admin1 ? `, ${place.admin1}` : ''
	const country = place.country ? `, ${place.country}` : ''
	return `${place.name}${region}${country}`
}

function useWeatherSearch() {
	const [query, setQuery] = useState<string>('London')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [result, setResult] = useState<{
		place: GeocodeResult | null
		weather: WeatherResponse | null
	} | null>(null)

	async function fetchWeather(city: string) {
		setIsLoading(true)
		setError(null)
		setResult(null)
		try {
			const geoUrl = new URL('https://geocoding-api.open-meteo.com/v1/search')
			geoUrl.searchParams.set('name', city)
			geoUrl.searchParams.set('count', '1')
			geoUrl.searchParams.set('language', 'en')
			geoUrl.searchParams.set('format', 'json')

			const geoRes = await fetch(geoUrl.toString())
			if (!geoRes.ok) throw new Error('Failed to fetch location')
			const geoData = await geoRes.json()
			const place: GeocodeResult | undefined = geoData?.results?.[0]
			if (!place) {
				throw new Error('No results for that city')
			}

			const { latitude, longitude } = place
			const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast')
			weatherUrl.searchParams.set('latitude', String(latitude))
			weatherUrl.searchParams.set('longitude', String(longitude))
			weatherUrl.searchParams.set('current_weather', 'true')
			weatherUrl.searchParams.set('hourly', 'temperature_2m,relativehumidity_2m,cloudcover,surface_pressure')
			weatherUrl.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min')
			weatherUrl.searchParams.set('timezone', 'auto')

			const wxRes = await fetch(weatherUrl.toString())
			if (!wxRes.ok) throw new Error('Failed to fetch weather')
			const wxData: WeatherResponse = await wxRes.json()

			setResult({ place, weather: wxData })
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Something went wrong'
			setError(message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		// initial load for default city
		fetchWeather(query)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { query, setQuery, isLoading, error, result, fetchWeather }
}

function TemperatureBadge({ value, unit = '°C' }: { value: number; unit?: string }) {
	return (
		<span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
			{Math.round(value)}{unit}
		</span>
	)
}

function WeatherNowCard({ place, weather }: { place: GeocodeResult; weather: WeatherResponse }) {
	const cw = weather.current_weather
	const description = WEATHER_CODE_MAP[cw.weathercode] ?? 'Current weather'

	const hourly = weather.hourly
	const humidity = hourly?.relativehumidity_2m?.[0]
	const pressure = hourly?.surface_pressure?.[0]
	const cloud = hourly?.cloudcover?.[0]

	const daily = weather.daily
	const tMax = daily?.temperature_2m_max?.[0]
	const tMin = daily?.temperature_2m_min?.[0]

	return (
		<div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600 p-6 text-white shadow-xl ring-1 ring-white/10">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<WeatherIcon code={cw.weathercode} />
					<h2 className="text-xl font-semibold">{formatPlace(place)}</h2>
				</div>
				<TemperatureBadge value={cw.temperature} />
			</div>
			<p className="mb-6 text-sm opacity-90">{description}</p>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div className="rounded-lg bg-white/10 p-3">
					<p className="text-xs opacity-80">Wind</p>
					<p className="text-lg font-medium">{Math.round(cw.windspeed)} km/h</p>
				</div>
				<div className="rounded-lg bg-white/10 p-3">
					<p className="text-xs opacity-80">Humidity</p>
					<p className="text-lg font-medium">{humidity != null ? `${Math.round(humidity)}%` : '—'}</p>
				</div>
				<div className="rounded-lg bg-white/10 p-3">
					<p className="text-xs opacity-80">Pressure</p>
					<p className="text-lg font-medium">{pressure != null ? `${Math.round(pressure)} hPa` : '—'}</p>
				</div>
				<div className="rounded-lg bg-white/10 p-3">
					<p className="text-xs opacity-80">Clouds</p>
					<p className="text-lg font-medium">{cloud != null ? `${Math.round(cloud)}%` : '—'}</p>
				</div>
			</div>

			{tMax != null && tMin != null && (
				<div className="mt-6">
					<p className="mb-2 text-xs opacity-80">Today</p>
					<div className="relative h-3 w-full overflow-hidden rounded-full bg-white/20">
						<div
							className="absolute inset-y-0 left-0 bg-white/70"
							style={{ width: `${Math.max(2, Math.min(100, (cw.temperature - tMin) / Math.max(1, tMax - tMin) * 100))}%` }}
						/>
					</div>
					<div className="mt-1 flex justify-between text-xs opacity-90">
						<span>Min {Math.round(tMin)}°</span>
						<span>Max {Math.round(tMax)}°</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default function App() {
	const { query, setQuery, isLoading, error, result, fetchWeather } = useWeatherSearch()
	const isDisabled = useMemo(() => isLoading || !query.trim(), [isLoading, query])

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!query.trim()) return
		fetchWeather(query.trim())
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 text-slate-100">
			<div className="mx-auto flex max-w-2xl flex-col items-stretch gap-4 py-8">
				<h1 className="text-center text-3xl font-bold tracking-tight">Weather Now</h1>
				<form onSubmit={handleSubmit} className="flex gap-2">
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search city (e.g., London)"
						className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
					/>
					<button
						type="submit"
						disabled={isDisabled}
						className="rounded-xl bg-sky-500 px-5 py-3 font-medium text-white shadow hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isLoading ? 'Loading…' : 'Search'}
					</button>
				</form>

				{error && (
					<div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
						{error}
					</div>
				)}

				{!error && result && result.place && result.weather && (
					<WeatherNowCard place={result.place} weather={result.weather} />
				)}

				{!error && !result && !isLoading && (
					<p className="text-center text-white/70">Search for a city to see the weather.</p>
				)}
			</div>
		</div>
	)
}
