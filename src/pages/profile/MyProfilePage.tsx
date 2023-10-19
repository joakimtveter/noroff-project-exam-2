import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetProfileByNameQuery } from '@/services/holidaze';
import { RootState } from '@/store';

import Container from '@/components/common/container';
import Layout from '@/components/layout';

import { Avatar, Badge, Box, Chip, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import VenueCard from '@/components/venue/venue-card';
import BookingList from '@/components/venue/booking-list';

export default function OwnProfilePage() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    // If the user is not logged in, redirect to login page
    if (!isLoggedIn) {
        toast.info('You are not logged in', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            toastId: 'not-logged-in'
        });
        const navigate = useNavigate();
        navigate('/sign-in');
    }
    const user = useSelector((state: RootState) => state.user.user);

    // Get the profile data from RTK query
    const { data, error, isLoading } = useGetProfileByNameQuery(user?.name);

    return (
        <>
            <Layout>
                <Container>
                    {error ? (
                        <>
                            <p>Oh no, there was an error</p>
                            {console.error(error)}
                        </>
                    ) : isLoading ? (
                        <CircularProgress />
                    ) : data ? (
                        <Box mt={3}>
                            <Stack direction='row' alignItems='center' gap={4}>
                            <Avatar
                                alt={data.name.toLocaleUpperCase()}
                                src={data.avatar}
                                sx={{ width: 200, height: 200 }}
                            />
                                <Stack component='hgroup' spacing={1}>
                                    <Typography component='h1' variant='h3'> {data.name}
                                        <IconButton aria-label='edit profile' component={Link} to={'/profile/edit'}>
                                            <EditIcon />
                                        </IconButton>
                                    </Typography>
                                    <Typography component='p' variant='subtitle1'> {data.email}</Typography>
                                    {data.venueManager  && <Chip label="Venue manager" color='primary' sx={{width: 'max-content'}} />}
                                </Stack>
                            </Stack>
                            <Stack direction='row' alignItems='center' gap={1}>
                                <Typography component='h2' variant='h4'>My Bookings</Typography>
                                <Badge color='primary' badgeContent={data._count.bookings}>
                                    <TodayOutlinedIcon  fontSize='large'/>
                                </Badge>
                            </Stack>
                            <BookingList bookings={data.bookings} />
                            {data.venueManager && data._count.venues > 0 &&
                            <Box>
                                <Typography component='h2' variant='h4'>My Venues</Typography>
                                <Stack component='ul' sx={{listStyleType: 'none', padding: 0}}>
                                    {data.venues.map((venue) => (
                                        <VenueCard key={venue.id} headingLevel={2} {...venue} />
                                    ))}
                                </Stack>
                            </Box>
                            }
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </Box>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
