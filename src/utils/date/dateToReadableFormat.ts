export function dateToReadableFormat(date: Date) : String {
    return new Intl.DateTimeFormat('nb-NO', {
        dateStyle: 'short'
    }).format(date)
}