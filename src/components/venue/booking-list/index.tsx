import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'

import DeleteIcon from '@mui/icons-material/Delete'
import Placeholder from '@/assets/venue-placeholder.svg'

import { BookingWithVenue } from '@/types/venue'
import { dateToReadableFormat } from '@/utils/date/dateToReadableFormat'
import { ReactElement } from 'react'

interface BookingListProps {
    bookings: BookingWithVenue[]
}

export default function BookingList(props: BookingListProps): ReactElement {
    const { bookings } = props
    return (
        <List dense={false} sx={{ maxWidth: '500px' }}>
            {bookings.map((booking) => {
                const from = dateToReadableFormat(new Date(booking.dateFrom))
                const to = dateToReadableFormat(new Date(booking.dateTo))
                return (
                    <ListItem
                        key={booking.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" color="error">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <img
                                    src={
                                        booking.venue.media[0] !== '' || booking.venue.media[0] != null
                                            ? booking.venue.media[0]
                                            : Placeholder
                                    }
                                    alt=""
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${booking.venue.name} - ${booking.guests} ${
                                booking.guests > 1 ? 'Guests' : 'Guest'
                            }`}
                            secondary={`${from} - ${to}`}
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}
