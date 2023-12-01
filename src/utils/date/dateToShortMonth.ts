export function dateToShortMonth(date: Date): string {
    return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
}
