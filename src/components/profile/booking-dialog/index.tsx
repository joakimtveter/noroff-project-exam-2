import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useGetBookingQuery } from '@/services/holidaze.ts'

interface BookingDialogProps {
    handleClose: () => void
    open: boolean
    bookingId: string
}
export default function BookingDialog(props: BookingDialogProps) {
    const { handleClose, open, bookingId } = props
    const { data, error, isLoading } = useGetBookingQuery(bookingId)

    const arrivalDate = data ? new Date(data.dateFrom) : null;
    const departureDate = data ? new Date(data.dateTo) : null;
    const numberOfNights = departureDate && arrivalDate ? Math.floor((departureDate.setHours(0,0,0,0) - arrivalDate.setHours(0,0,0,0)) / (1000 * 3600 * 24)) : null;


    if (error) console.error(error)
    return (
        <Dialog
            open={open && bookingId !== ''}
            onClose={handleClose}
            aria-labelledby="booking-dialog-title"
            aria-describedby="booking-dialog-description"
        >
            <DialogTitle id="booking-dialog-title">Booking details - {data?.venue.name}</DialogTitle>
            <DialogContent>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Box>
                        <DialogContentText id="booking-dialog-description"><Box component='span' sx={{fontWeight: 700}}>Arrive on: </Box>{arrivalDate?.toLocaleDateString('en-NO', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</DialogContentText>
                        <DialogContentText id="booking-dialog-description"><Box component='span' sx={{fontWeight: 700}}>Depart on: </Box>{departureDate?.toLocaleDateString('en-NO', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</DialogContentText>
                        <DialogContentText id="booking-dialog-description"><Box component='span' sx={{fontWeight: 700}}>Number of nights: </Box>{numberOfNights}</DialogContentText>
                        <DialogContentText id="booking-dialog-description"><Box component='span' sx={{fontWeight: 700}}>Number of guests: </Box>{data?.guests}</DialogContentText>
                        <DialogContentText id="booking-dialog-description"><Box component='span' sx={{fontWeight: 700}}>Price per night: </Box>{data?.venue.price}</DialogContentText>
                        <DialogContentText id="booking-dialog-description"><Box component='span' sx={{fontWeight: 700}}>Total price: </Box>{(data?.venue.price ?? 0) * (numberOfNights ?? 0)}</DialogContentText>
                        <Link component={RouterLink} to={`/venues/${data?.venue.id}`} underline="hover"> Visit venue page</Link>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Dismiss
                </Button>
            </DialogActions>
        </Dialog>
    )
}
