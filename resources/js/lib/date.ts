export function formatDateFr(iso: string): string {
	return new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function parseIsoDate(iso: string): Date {
	return new Date(iso + 'T00:00:00');
}

export function toIsoDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export function formatDateNumericFr(iso: string): string {
	return new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});
}