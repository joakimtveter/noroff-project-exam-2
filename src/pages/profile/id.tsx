import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetProfileByNameQuery } from '@/services/holidaze';
import { RootState } from '@/store';

import Container from '@/components/common/container';
import Layout from '@/components/layout';

import { Avatar, Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import VenueCard from '@/components/venue/venue-card';

export default function ProfilePage() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const { profileName } = useParams<{ profileName: string }>();

    // If the user is not logged in and is not trying to access his own profile, redirect to login page
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
        navigate('/');
    }

    // Get the profile data from RTK query
    if (!profileName) return null;
    const { data, error, isLoading } = useGetProfileByNameQuery(profileName);

    // if the current user is not logged in, redirect to login page.

    console.log('user: ', data);
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
                                    </Typography>
                                    <Typography component='p' variant='subtitle1'> {data.email}</Typography>
                                    {data.venueManager  && <Chip label="Venue manager" color='primary' sx={{width: 'max-content'}} />}
                                </Stack>
                            </Stack>
                            {data.venueManager && data._count.venues > 0 &&
                            <Box>
                                <Typography component='h2' variant='h4'>Venues</Typography>
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
