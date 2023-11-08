import { Booking } from '@/types/booking'

import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import DeleteIcon from '@mui/icons-material/Delete'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'

import { dateToShortMonth } from '@/utils/date/dateToShortMonth'
import { dateToDayNumber } from '@/utils/date/dateToDayNumber'
import { datesToNumberOfDays } from '@/utils/date/datesToNumberOfDays'
import { dateToReadableFormat } from '@/utils/date/dateToReadableFormat'
import { ReactElement, SyntheticEvent, useState } from 'react'

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
        <>
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
                <TabPanel value="2">
                    <List dense={false} sx={{ maxWidth: '500px' }}>
                        {bookings
                            .filter((booking) => new Date(booking.dateTo).getTime() < new Date().getTime())
                            .map((booking) => (
                                <BookingItems key={booking.id} {...booking} />
                            ))}
                    </List>
                </TabPanel>
            </TabContext>
        </>
    )
}

function BookingItems(props: Booking): ReactElement {
    const fromDate = new Date(props.dateFrom)
    const toDate = new Date(props.dateTo)
    const from = dateToReadableFormat(fromDate)
    const to = dateToReadableFormat(toDate)
    const stayDuration = datesToNumberOfDays(fromDate, toDate)

    return (
        <ListItem
            secondaryAction={
                <IconButton>
                    <DeleteIcon />
                </IconButton>
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
        </ListItem>
    )
}
