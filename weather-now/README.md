# Weather Now

A fast, minimal weather app for Jamie (Outdoor Enthusiast) to check current weather in any city. Built with React + Vite + Tailwind, using Open-Meteo APIs.

## Live Demo
- Netlify: <https://weathernowwww.netlify.app/>

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


## Build
```bash
npm run build
npm run preview
```

## Deployment
### Netlify
- New site from Git → select repo
- Build: `npm run build`
- Publish directory: `dist`
- Root `netlify.toml` config is included (base set to `weather-now`).

## APIs
No API keys required.
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name=London`
- Weather: `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current_weather=true`

## Submission Checklist
- [x] Working with AI link (this conversation)
- [x] Deployed application URL (Netlify)
- [x] Code shared with README and notes
- [x] Submitted within one week
