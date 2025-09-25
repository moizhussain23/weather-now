export function WeatherIcon({ code, className = 'h-10 w-10' }: { code: number; className?: string }) {
	const common = 'text-white'
	if (code === 0) return <Sun className={`${className} ${common}`} />
	if ([1, 2].includes(code)) return <PartlyCloudy className={`${className} ${common}`} />
	if (code === 3) return <Cloud className={`${className} ${common}`} />
	if ([61, 63, 65, 80, 81, 82].includes(code)) return <Rain className={`${className} ${common}`} />
	if ([71, 73, 75, 85, 86].includes(code)) return <Snow className={`${className} ${common}`} />
	if ([95, 96, 99].includes(code)) return <Thunder className={`${className} ${common}`} />
	return <Cloud className={`${className} ${common}`} />
}

function Sun({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
	)
}

function Cloud({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
			<path d="M17.5 19a4.5 4.5 0 000-9 6 6 0 10-11.19 2.4A4 4 0 006 19h11.5z" />
		</svg>
	)
}

function PartlyCloudy({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="7" cy="7" r="3" />
			<path d="M17.5 19a4.5 4.5 0 000-9 6 6 0 10-11.19 2.4A4 4 0 006 19h11.5z" />
		</svg>
	)
}

function Rain({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
			<path d="M17.5 17a4.5 4.5 0 000-9 6 6 0 10-11.19 2.4A4 4 0 006 17h11.5z" />
			<path d="M8 20l1-2M12 21l1-2M16 20l1-2" />
		</svg>
	)
}

function Snow({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 3v18M5 8l14 8M19 8L5 16" />
		</svg>
	)
}

function Thunder({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
			<path d="M17.5 15a4.5 4.5 0 000-9 6 6 0 10-11.19 2.4A4 4 0 006 15h11.5z" />
			<path d="M13 13l-2 4h3l-2 4" />
		</svg>
	)
}
