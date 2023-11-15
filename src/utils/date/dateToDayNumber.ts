export function dateToDayNumber(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
    }).format(date)
}
