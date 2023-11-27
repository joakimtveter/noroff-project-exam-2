import { ReactElement } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

interface BookingDeleteDialogProps {
    handleClose: () => void
    handleDelete: () => void
    open: boolean
}

export default function BookingDeleteDialog(props: BookingDeleteDialogProps): ReactElement {
    const { handleClose, handleDelete, open } = props

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this booking?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
