export function dateToReadableFormat(date: Date): string {
    return new Intl.DateTimeFormat('nb-NO', {
        dateStyle: 'short',
    }).format(date)
}
