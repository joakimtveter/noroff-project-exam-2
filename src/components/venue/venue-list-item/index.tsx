import { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemAvatar,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import ListItemText from '@mui/material/ListItemText'
import VenuePlaceholder from '@/assets/venue-placeholder.svg'
import { Location } from '@/types/venue.ts'
import { useDeleteVenueMutation } from '@/services/holidaze.ts'

interface VenueCardProps {
    id: string
    name: string
    media: string[]
    location: Location
}

export default function VenueListItem(props: VenueCardProps): ReactElement {
    const {
        id,
        name,
        media,
        location: { country, city, continent },
    } = props
    const [open, setOpen] = useState(false)
    const [deleteVenue] = useDeleteVenueMutation()
    const src: string = media[0] ?? VenuePlaceholder
    const secondary = [city, country, continent].join(', ')

    const handleClickOpen = (): void => {
        setOpen(true)
    }
    const handleClose = (): void => {
        setOpen(false)
    }
    const handleDelete = async (id: string): Promise<void> => {
        setOpen(false)
        console.log('delete: ', id)
        await deleteVenue(id).unwrap()
    }

    return (
        <ListItem
            key={id}
            sx={{ maxWidth: '600px' }}
            divider={true}
            secondaryAction={
                <Box>
                    <IconButton aria-label={`Delete ${name}`} onClick={handleClickOpen} color="error">
                        <DeleteIcon />
                    </IconButton>
                    <Button component={Link} to={`/venues/${id}`} aria-label={`View ${name}`}>
                        View Venue
                    </Button>
                </Box>
            }
        >
            <ListItemAvatar>
                <Avatar src={src} alt="" />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={secondary} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete the venue?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the venue named {name}? This action can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async (): Promise<void> => {
                            await handleDelete(id)
                        }}
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    )
}
