import { ReactElement, SyntheticEvent, useState } from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Stack, Box, Tab, Button } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { dateToShortMonth } from '@/utils/date/dateToShortMonth'
import { dateToDayNumber } from '@/utils/date/dateToDayNumber'
import { datesToNumberOfDays } from '@/utils/date/datesToNumberOfDays'
import { dateToReadableFormat } from '@/utils/date/dateToReadableFormat'

import { Booking } from '@/types/booking'
import { visuallyHidden } from '@mui/utils'
import BookingDialog from '@/components/profile/booking-dialog'

interface VenueBookingListProps {
    bookings: Booking[]
}

export default function VenueBookingList(props: VenueBookingListProps): ReactElement {
    const { bookings = [] } = props
    const [value, setValue] = useState('1')

    const handleChange = (_event: SyntheticEvent, newValue: string): void => {
        setValue(newValue)
    }
    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Booking tabs">
                    <Tab label="Current Bookings" value="1" />
                    <Tab label="Past Bookings" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <List dense={false} sx={{ maxWidth: '500px' }}>
                    {bookings
                        .filter((booking) => new Date(booking.dateTo).getTime() > new Date().getTime())
                        .sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime())
                        .map((booking) => (
                            <BookingItems key={booking.id} {...booking} />
                        ))}
                </List>
            </TabPanel>
            <TabPanel value="2" sx={{ padding: '0' }}>
                <List dense={false} sx={{ maxWidth: '675px' }}>
                    {bookings
                        .filter((booking) => new Date(booking.dateTo).getTime() < new Date().getTime())
                        .sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime())
                        .map((booking) => (
                            <BookingItems key={booking.id} {...booking} />
                        ))}
                </List>
            </TabPanel>
        </TabContext>
    )
}

function BookingItems(props: Booking): ReactElement {
    const [open, setOpen] = useState(false)
    const fromDate = new Date(props.dateFrom)
    const toDate = new Date(props.dateTo)
    const from = dateToReadableFormat(fromDate)
    const to = dateToReadableFormat(toDate)
    const stayDuration = datesToNumberOfDays(fromDate, toDate)
    const handleClose = (): void => {
        setOpen(false)
    }

    const handleOpen = (): void => {
        setOpen(true)
    }

    return (
        <ListItem
            secondaryAction={
                <Button variant="outlined" onClick={handleOpen}>
                    View
                    <Box component="span" style={visuallyHidden}>
                        Booking
                    </Box>
                </Button>
            }
        >
            <ListItemAvatar>
                <Stack component="p" alignItems="center">
                    <Box component="span" sx={{ fontSize: '20px', margin: '0 0 -3px', color: 'red' }}>
                        {dateToDayNumber(fromDate)}
                    </Box>
                    <Box component="span" sx={{ fontSize: '12px', margin: 0 }}>
                        {dateToShortMonth(fromDate).toUpperCase()}
                    </Box>
                </Stack>
            </ListItemAvatar>
            <ListItemText
                primary={`${props.guests} ${props.guests > 1 ? 'Guests' : 'Guest'} - ${stayDuration} ${
                    stayDuration > 1 ? 'Nights' : 'Night'
                }`}
                secondary={`${from} - ${to}`}
            />
            <BookingDialog handleClose={handleClose} open={open} bookingId={props.id} />
        </ListItem>
    )
}
