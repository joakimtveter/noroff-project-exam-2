import { ChangeEvent, ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { Button, CalendarCell, CalendarGrid, DateValue, Heading, RangeCalendar } from 'react-aria-components'

import { useCreateBookingMutation } from '@/services/holidaze'

import { Box, Button as MuiButton, InputAdornment, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'

import { Booking } from '@/types/booking.ts'

interface BookingCalendarProps {
    bookings: Booking[]
    maxGuests: number
    venueId: string
    enableBooking?: boolean
}

export default function BookingCalendar(props: BookingCalendarProps): ReactElement {
    const { bookings, maxGuests = 100, venueId, enableBooking = false } = props
    const [createBooking] = useCreateBookingMutation()
    const [guests, setGuests] = useState<number | null>(1)
    const [dates, setDates] = useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()),
    })
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(width < 900px)')

    const isDateUnavailable = (currentDate: DateValue): boolean => {
        return bookings.some(
            (booking) =>
                currentDate.compare(parseDate(booking.dateFrom.split('T')[0])) >= 0 &&
                currentDate.compare(parseDate(booking.dateTo.split('T')[0])) <= 0
        )
    }

    const handleBooking = async (): Promise<void> => {
        if (guests === null) {
            toast.error('Booking failed. Must have number of guests.')
            return
        }
        const dateFrom = new Date(dates.start.toString()).toISOString()
        const dateTo = new Date(dates.end.toString()).toISOString()

        await createBooking({ dateTo, dateFrom, guests, venueId })
        navigate('/profile')
    }

    return (
        <Box sx={{ marginBlock: 4, width: 'max-content' }}>
            <RangeCalendar
                isReadOnly={!enableBooking}
                aria-label="Trip dates"
                value={dates}
                onChange={setDates}
                minValue={today(getLocalTimeZone())}
                visibleDuration={{ months: isMobile ? 1 : 2 }}
                isDateUnavailable={isDateUnavailable}
                style={{ width: 'max-content' }}
            >
                <Box component="header" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button slot="previous">◀</Button>
                    <Heading />
                    <Button slot="next">▶</Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
                    <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
                    {!isMobile && (
                        <CalendarGrid offset={{ months: 1 }}>{(date) => <CalendarCell date={date} />}</CalendarGrid>
                    )}
                </Box>
            </RangeCalendar>
            {enableBooking ? (
                <Stack direction="row" alignItems="center" gap={4} sx={{ marginBlock: 2 }}>
                    <TextField
                        label={'Guests'}
                        variant={'outlined'}
                        margin={'normal'}
                        type={'number'}
                        value={guests}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setGuests(e.target.valueAsNumber)
                        }}
                        inputProps={{
                            min: 1,
                            max: maxGuests,
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            style: { textAlign: 'end' },
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{<GroupIcon />}</InputAdornment>,
                        }}
                    />
                    <MuiButton variant="contained" onClick={handleBooking} sx={{ marginBlock: 2 }}>
                        Book Venue
                    </MuiButton>
                </Stack>
            ) : (
                <Typography component="p" variant="body1" textAlign="center" marginBlock={2} width={'100%'}>
                    {' '}
                    You must be logged in to book this venue.
                </Typography>
            )}
        </Box>
    )
}
