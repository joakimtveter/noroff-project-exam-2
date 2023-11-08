import { ReactElement } from 'react'
import { useDeleteBookingMutation } from '@/services/holidaze.ts'

import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Placeholder from '@/assets/venue-placeholder.svg'

import { dateToReadableFormat } from '@/utils/date/dateToReadableFormat.ts'
import { BookingWithVenue } from '@/types/booking.ts'
import { Link } from 'react-router-dom'

interface BookingListProps {
    bookings: BookingWithVenue[]
}

export default function BookingList(props: BookingListProps): ReactElement {
    const { bookings } = props
    const [deleteBooking] = useDeleteBookingMutation()

    const handleDelete = async (id: string): Promise<void> => {
        console.log('deleted booking: ', id)
        await deleteBooking(id)
    }
    return (
        <List dense={false} sx={{ maxWidth: '500px' }}>
            {bookings.map((booking) => {
                const from = dateToReadableFormat(new Date(booking.dateFrom))
                const to = dateToReadableFormat(new Date(booking.dateTo))
                return (
                    <ListItem
                        key={booking.id}
                        secondaryAction={
                            <>
                                <Tooltip title={'Delete booking'}>
                                    <IconButton
                                        edge="end"
                                        aria-label={`Delete booking at ${booking.venue.name}`}
                                        color="error"
                                        onClick={async () => {
                                            await handleDelete(booking.id)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Button component={Link} to={`/bookings/${booking.id}`}>
                                    View Booking
                                </Button>
                            </>
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
