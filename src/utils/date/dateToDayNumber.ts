export function dateToDayNumber(date: Date) : String {
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric'
    }).format(date)
}