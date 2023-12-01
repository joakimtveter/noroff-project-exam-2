import { ReactElement, useState } from 'react'
import { useDeleteBookingMutation } from '@/services/holidaze.ts'

import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Placeholder from '@/assets/venue-placeholder.svg'

import { dateToReadableFormat } from '@/utils/date/dateToReadableFormat.ts'
import { BookingWithVenue } from '@/types/booking.ts'
import AlertDialog from '@/components/common/dialog'
import BookingDialog from '@/components/profile/booking-dialog'
import { toast } from 'react-toastify'

interface BookingListProps {
    bookings: BookingWithVenue[]
}

export default function BookingList(props: BookingListProps): ReactElement {
    const { bookings } = props
    const [dialogOpen, setDialogOpen] = useState(false)
    const [bookingOpen, setBookingOpen] = useState(false)
    const [deleteBooking] = useDeleteBookingMutation()

    const handleClose = (): void => {
        setDialogOpen(false)
    }

    const handleDelete = async (id: string): Promise<void> => {
        await deleteBooking(id)
        toast.info('Booking deleted')
        setDialogOpen(false)
    }
    return (
        <List dense={false} sx={{ maxWidth: '675px' }}>
            {bookings.map((booking) => {
                const from = dateToReadableFormat(new Date(booking.dateFrom))
                const to = dateToReadableFormat(new Date(booking.dateTo))
                return (
                    <ListItem
                        key={booking.id}
                        secondaryAction={
                            <Box>
                                <Tooltip title={'Delete booking'}>
                                    <IconButton
                                        aria-label={`Delete booking at ${booking.venue.name}`}
                                        onClick={() => {
                                            setDialogOpen(true)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() => {
                                        setBookingOpen(true)
                                    }}
                                    aria-label={`View booking for ${booking.venue.name} on ${
                                        booking.venue.name
                                    } on ${new Date(booking.dateFrom).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                    })}.`}
                                >
                                    View
                                </Button>
                                <BookingDialog
                                    handleClose={() => {
                                        setBookingOpen(false)
                                    }}
                                    open={bookingOpen}
                                    bookingId={booking.id}
                                />
                            </Box>
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
                        <AlertDialog
                            key={booking.id}
                            open={dialogOpen}
                            title={'Delete Booking'}
                            text={`Are you sure you want to delete this booking for ${booking.guests} people at ${
                                booking.venue.name
                            } on ${new Date(booking.dateFrom).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                            })}.`}
                            handleClose={handleClose}
                            primaryColor={'error'}
                            action={async () => {
                                await handleDelete(booking.id)
                            }}
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}
