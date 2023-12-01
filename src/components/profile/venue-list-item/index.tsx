import { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteVenueMutation } from '@/services/holidaze.ts'

import { Avatar, Box, Button, IconButton, ListItem, ListItemAvatar, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItemText from '@mui/material/ListItemText'

import VenuePlaceholder from '@/assets/venue-placeholder.svg'
import AlertDialog from '@/components/common/dialog'

import { VenueLocation } from '@/types/venue.ts'

interface VenueCardProps {
    id: string
    name: string
    media: string[]
    location: VenueLocation
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
        await deleteVenue(id).unwrap()
    }

    return (
        <ListItem
            key={id}
            sx={{ maxWidth: '675px' }}
            divider={true}
            secondaryAction={
                <Box>
                    <Tooltip title={'Delete Venue'}>
                        <IconButton aria-label={`Delete venue ${name}`} onClick={handleClickOpen}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant="outlined"
                        color="secondary"
                        component={Link}
                        to={`/venues/${id}`}
                        aria-label={`View and administer ${name} venue`}
                    >
                        View
                    </Button>
                </Box>
            }
        >
            <ListItemAvatar>
                <Avatar src={src} alt="" />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={secondary} />
            <AlertDialog
                open={open}
                title={`Delete ${name}?`}
                text={`Are you sure you want to delete the venue named ${name}? This action can not be undone.`}
                primaryColor={'error'}
                action={async (): Promise<void> => {
                    await handleDelete(id)
                }}
                handleClose={handleClose}
            />
        </ListItem>
    )
}
