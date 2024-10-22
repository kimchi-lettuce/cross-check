export function dateTimeFormat(date: Date | null) {
	if (!date) return ''

	return new Intl.DateTimeFormat('en-AU', {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		timeZone: 'Australia/Sydney'
	}).format(date)
}