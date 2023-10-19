export function datesToNumberOfDays(fromDate: Date, toDate: Date) :number {
    const time = toDate.setUTCHours(0,0,0,0) - fromDate.setUTCHours(0,0,0,0)
    const msInDay = 86400000
    return Math.floor(time / msInDay)
}