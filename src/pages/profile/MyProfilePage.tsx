import { ChangeEvent, ReactElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { useGetOwnProfileQuery, useUpdateUserAvatarMutation, useBecomeVenueManagerMutation } from '@/services/holidaze'
import { updateAvatar } from '@/features/user/userSlice.ts'
import { RootState } from '@/store'

import {
    Avatar,
    Badge,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

import BookingList from '@/components/profile/booking-list'
import VenueListItem from '@/components/profile/venue-list-item'

export default function OwnProfilePage(): ReactElement {
    // Local State
    const [open, setOpen] = useState<boolean>(false)
    const [newAvatarURL, setNewAvatarURL] = useState<string>('')

    // Redux hooks
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const user = useSelector((state: RootState) => state.user.user)
    const [updateUserAvatar] = useUpdateUserAvatarMutation()
    const [becomeVenueManager] = useBecomeVenueManagerMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleUrl = (value: string): void => {
        setNewAvatarURL(value)
    }
    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const handleSubmit = async (): Promise<void> => {
        try {
            const body = { avatar: newAvatarURL }
            await updateUserAvatar({ name: user?.name, body }).unwrap()
            dispatch(updateAvatar(newAvatarURL))
        } catch (error) {
            toast.error('Something went wrong')
            console.error(error)
        }
        setOpen(false)
        setNewAvatarURL('')
    }

    // If the user is not logged in, redirect to login page
    if (!isLoggedIn) {
        toast.info('You are not logged in', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            toastId: 'not-logged-in',
        })
        navigate('/auth')
    }

    const { data, error, isLoading } = useGetOwnProfileQuery(user?.name)

    if (error != null) {
        console.error(error)
        toast.error('There was an error!')
    }

    return (
        <>
            {error != null ? (
                <>
                    <p>Oh no, there was an error</p>
                </>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <Box mt={3}>
                    <Stack direction="row" alignItems="center" gap={4}>
                        <Box
                            component="button"
                            onClick={handleClickOpen}
                            sx={{
                                position: 'relative',
                                border: 'none',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                borderRadius: '50%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    placeItems: 'center',
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex: 4,
                                    borderRadius: '50%',
                                    color: 'white',
                                    opacity: 0,
                                    backgroundColor: '#00000044',
                                    padding: 0,
                                    ':hover': { opacity: 1 },
                                    ':focus': { opacity: 1 },
                                }}
                            >
                                <EditIcon />
                            </Box>
                            <Avatar
                                alt={data.name.toLocaleUpperCase()}
                                src={data.avatar}
                                sx={{ width: 200, height: 200 }}
                            />
                            <Typography component="span" style={visuallyHidden}>
                                Change Profile Picture
                            </Typography>
                        </Box>
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
                                        handleUrl(e.target.value)
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
                                    Cancel
                                </Button>
                                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                                <Button variant="contained" color="success" onClick={handleSubmit}>
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Stack component="hgroup" spacing={1}>
                            <Typography component="h1" variant="h3">
                                {' '}
                                {data.name}
                            </Typography>
                            <Typography component="p" variant="subtitle1">
                                {' '}
                                {data.email}
                            </Typography>
                            {data.venueManager === true && (
                                <Chip
                                    label="Venue manager"
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ width: 'max-content' }}
                                />
                            )}
                        </Stack>
                    </Stack>
                    {data?.venueManager === false && (
                        <Box component="section" sx={{ marginBlock: 4 }}>
                            <Typography component="h2" variant="h4">
                                Become a Venue Manager
                            </Typography>
                            <Typography component="p" variant="h5" sx={{ marginBlock: 2 }}>
                                You are not a venue manager. If you have a room, a cabin, or some other nice
                                accommodation you would like to rent out? Get started by pushing the button below.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ marginBlock: 4 }}
                                onClick={async () => await becomeVenueManager(data.name)}
                            >
                                Become A Venue Manager
                            </Button>
                        </Box>
                    )}
                    {data.venueManager === true && (
                        <Box component="section" sx={{ marginBlock: 4 }}>
                            <Stack direction="row" alignItems="center" gap={2}>
                                <Typography component="h2" variant="h4">
                                    My Venues
                                </Typography>
                                <Badge color="secondary" badgeContent={data._count.venues}>
                                    <HolidayVillageIcon fontSize="large" />
                                </Badge>
                            </Stack>

                            <List component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                                {data.venues.length < 1 && <Typography>You have no venues</Typography>}
                                {data.venues.map((venue) => (
                                    <VenueListItem key={venue.id} {...venue} />
                                ))}
                            </List>
                            <Button
                                component={Link}
                                to="/venues/add"
                                endIcon={<AddIcon />}
                                variant="contained"
                                sx={{ marginBlock: 2 }}
                            >
                                Add venue
                            </Button>
                        </Box>
                    )}
                    <Box component="section" sx={{ marginBlock: 4 }}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Typography component="h2" variant="h4">
                                My Bookings
                            </Typography>
                            <Badge color="secondary" badgeContent={data._count.bookings}>
                                <TodayOutlinedIcon fontSize="large" />
                            </Badge>
                        </Stack>
                        <BookingList bookings={data.bookings} />
                    </Box>
                </Box>
            ) : null}
        </>
    )
}
