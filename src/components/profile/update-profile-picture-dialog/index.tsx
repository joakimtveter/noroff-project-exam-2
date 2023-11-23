import { ChangeEvent, ReactElement, useState } from 'react'
import { useUpdateUserAvatarMutation } from '@/services/holidaze.ts'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { updateAvatar } from '@/features/user/userSlice.ts'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

interface UpdateProfilePictureDialogProps {
    handleClose: () => void
    open: boolean
    name: string
}
export default function UpdateProfilePictureDialog(props: UpdateProfilePictureDialogProps): ReactElement {
    const { open, handleClose, name } = props
    const [newAvatarURL, setNewAvatarURL] = useState<string>('')
    const dispatch = useDispatch()
    const [updateUserAvatar] = useUpdateUserAvatarMutation()
    const handleUrlChange = (value: string): void => {
        setNewAvatarURL(value)
    }

    const handleSubmit = async (): Promise<void> => {
        try {
            const body = { avatar: newAvatarURL }
            await updateUserAvatar({ name, body }).unwrap()
            dispatch(updateAvatar(newAvatarURL))
        } catch (error) {
            toast.error('Something went wrong with updating the profile picture')
            console.error(error)
        }
        handleClose()
        setNewAvatarURL('')
    }

    return (
        <Dialog open={open} fullWidth={true} onClose={handleClose}>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter a URL to the desired profile picture.</DialogContentText>
                <TextField
                    autoFocus
                    label="Avatar URL"
                    type="url"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={newAvatarURL}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                        handleUrlChange(e.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}
