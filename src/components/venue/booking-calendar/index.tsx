import { Box } from '@mui/material'
import { I18nProvider } from 'react-aria'
import { Button, CalendarCell, CalendarGrid, Heading, RangeCalendar } from 'react-aria-components'
import { ReactElement } from 'react'
import { Booking } from '@/types/venue.ts'

interface BookingCalendarProps {
    bookings: Booking[]
}

export default function BookingCalendar(props: BookingCalendarProps): ReactElement {
    const { bookings } = props
    console.log('bookings: ', bookings)
    return (
        <I18nProvider locale="en-NO">
            <RangeCalendar aria-label="Trip dates" style={{ width: 'max-content' }}>
                <Box component="header" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button slot="previous">◀</Button>
                    <Heading />
                    <Button slot="next">▶</Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
                    <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
                    <CalendarGrid offset={{ months: 1 }}>{(date) => <CalendarCell date={date} />}</CalendarGrid>
                </Box>
            </RangeCalendar>
        </I18nProvider>
    )
}
