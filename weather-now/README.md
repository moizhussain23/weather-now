# Weather Now

A fast, minimal weather app for Jamie (Outdoor Enthusiast) to check current weather in any city. Built with React + Vite + Tailwind, using Open-Meteo APIs.

## Features
- Quick city search with Enter key
- Real-time current weather (temperature, condition, wind)
- Extra metrics: humidity, pressure, cloud cover
- Today min/max with visual bar
- Clean, responsive UI with Tailwind

## Tech Stack
- React (Vite, TypeScript)
- Tailwind CSS
- Open-Meteo Geocoding + Forecast APIs

## Getting Started
```bash
cd weather-now
npm install
npm run dev
```
Then open `http://localhost:5173`.

## Build
```bash
npm run build
npm run preview
```

## Deployment
Deploy the `weather-now` folder on Vercel or Netlify as a static site.
- Vercel: Import project -> Framework preset: Vite
- Netlify: `npm run build`, publish `dist/`

## Configuration
No API keys required. APIs used:
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name=London`
- Weather: `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true`

## Notes
- Default search loads "London" on first render. Use the search bar to query any city.
