import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { useGetBookingQuery } from '@/services/holidaze.ts'

interface BookingDialogProps {
    handleClose: () => void
    open: boolean
    bookingId: string
}
export default function BookingDialog(props: BookingDialogProps) {
    const { handleClose, open, bookingId } = props
    const { data, error, isLoading } = useGetBookingQuery(bookingId)

    if (error) console.error(error)
    return (
        <Dialog
            open={open && bookingId !== ''}
            onClose={handleClose}
            aria-labelledby="booking-dialog-title"
            aria-describedby="booking-dialog-description"
        >
            <DialogTitle id="booking-dialog-title">Booking details</DialogTitle>
            <DialogContent>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Box>
                        <DialogContentText id="booking-dialog-description">tesdt</DialogContentText>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}
