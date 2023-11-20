import { ReactElement } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface AlertDialogProps {
    open: boolean
    title: string
    text: string
    primaryButtonText?: string
    primaryColor: 'error' | 'success' | 'secondary'
    action: () => Promise<void>
    secondaryButtonText?: string
    handleClose: () => void
}
export default function AlertDialog(props: AlertDialogProps): ReactElement {
    const {
        open,
        title,
        text,
        primaryButtonText = 'Confirm',
        primaryColor,
        secondaryButtonText = 'Cancel',
        handleClose,
        action,
    } = props
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id={'alert-dialog-description'}>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
                    {secondaryButtonText}
                </Button>
                <Button color={primaryColor} variant="contained" onClick={action} autoFocus>
                    {primaryButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
