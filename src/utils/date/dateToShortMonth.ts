export function dateToShortMonth(date: Date):String {
    return new Intl.DateTimeFormat('en-US', {month: 'short'}).format(date)
}