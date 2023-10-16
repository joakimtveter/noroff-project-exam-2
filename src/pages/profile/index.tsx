import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Container from '@/components/common/container';
import Layout from '@/components/layout';
import { useGetProfileByNameQuery } from '@/services/holidaze';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VenueCard from '@/components/venue/venue-card';

export default function ProfilePage() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const { profileName } = useParams<{ profileName: string }>();
    if (!isLoggedIn && !profileName) {
        const navigate = useNavigate();
        navigate('/sign-in');
    }
    const user = useSelector((state: RootState) => state.user.user);
    // if (!user.name && !profileName) {
    //     // If the user is not logged in, redirect to login page
    //     const navigate = useNavigate();
    //     navigate('/login');
    // }

    // Get the profile data from RTK query
    const { data, error, isLoading } = useGetProfileByNameQuery(profileName || user?.name);

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
                        <p>Loading...</p>
                    ) : data ? (
                        <Box>
                            <Stack direction='row' alignItems='center' gap={2}>
                            <Avatar
                                alt={data.name.toLocaleUpperCase()}
                                src={data.avatar !== '' ? data.avatar : 'this string ensures a letter'}
                                sx={{ width: 200, height: 200 }}
                            />
                                <Stack component='hgroup'>
                                    <Typography component='h1' variant='h3'> {data.name}  
                                        <IconButton aria-label='edit profile' component={Link} to={'/profile/edit'}>
                                            <EditIcon />
                                        </IconButton>
                                    </Typography>
                                    <Typography component='p' variant='subtitle1'> {data.email}</Typography>
                                </Stack>
                            </Stack>
                            {data.venueManager  && 
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
