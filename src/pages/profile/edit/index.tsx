import {  useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetProfileByNameQuery } from '@/services/holidaze';
import { RootState } from '@/store';

import Container from '@/components/common/container';
import Layout from '@/components/layout';

import { Avatar, Box, TextField, Typography } from '@mui/material';
export default function EditProfilePage() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const { profileName } = useParams<{ profileName: string }>();

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
        });
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
                        <Box mt={3}>
                            <Typography component='h1' variant='h2'> Edit Profile</Typography>
                            <Box component='form'>
                                <Avatar>

                                </Avatar>
                                <TextField id="avatar-field" label="Profile image" variant="outlined"  type='url' inputMode='url' />
                            </Box>
                        </Box>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
