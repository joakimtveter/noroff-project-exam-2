import { ChangeEvent, ReactElement, useState } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Button, CalendarCell, CalendarGrid, Heading, RangeCalendar } from 'react-aria-components'

import { useCreateBookingMutation } from '@/services/holidaze'

import { Box, Button as MuiButton, InputAdornment, TextField } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'

import { Booking } from '@/types/booking.ts'

interface BookingCalendarProps {
    bookings: Booking[]
    maxGuests: number
    venueId: string
}

export default function BookingCalendar(props: BookingCalendarProps): ReactElement {
    const { bookings, maxGuests = 100, venueId } = props
    const [createBooking] = useCreateBookingMutation()
    const [dates, setDates] = useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()),
    })
    const [guests, setGuests] = useState(1)
    console.log('bookings: ', bookings)
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const guests = parseInt(e.target.value)
        if (isNaN(guests)) return
        if (guests > maxGuests) {
            setGuests(maxGuests)
            return
        }
        if (guests < 1) {
            setGuests(1)
            return
        }
        setGuests(guests)
    }

    const handleClick = async (): Promise<void> => {
        const dateFrom = new Date(dates.start.toString()).toISOString()
        const dateTo = new Date(dates.end.toString()).toISOString()
        console.log('values: ', { dateTo, dateFrom, guests, venueId })

        await createBooking({ dateTo, dateFrom, guests, venueId })
    }
    return (
        <Box sx={{ marginBlock: 4 }}>
            <RangeCalendar
                aria-label="Trip dates"
                value={dates}
                onChange={setDates}
                minValue={today(getLocalTimeZone())}
                visibleDuration={{ months: 2 }}
                style={{ width: 'max-content' }}
            >
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

            <Box>
                <TextField
                    label={'Number of guests'}
                    variant={'outlined'}
                    margin={'normal'}
                    value={guests}
                    onChange={handleChange}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'end' } }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{<GroupIcon />}</InputAdornment>,
                    }}
                />
                <MuiButton variant="contained" onClick={handleClick} sx={{ marginBlock: 2 }}>
                    Book Venue
                </MuiButton>
            </Box>
        </Box>
    )
}
