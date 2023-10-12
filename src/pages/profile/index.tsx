import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Container from '@/components/common/container';
import Layout from '@/components/layout';
import { useGetProfileByNameQuery } from '@/services/holidaze';
import { Avatar, Box } from '@mui/material';

export default function ProfilePage() {
    // Get the profile name from the url
    // If the profile name is undefined, then we are on the current user profile
    const { profileName } = useParams<{ profileName: string }>();
    // Get the current user from the redux store
    const user = useSelector((state: RootState) => state.user.user);
    // if (!user.name && !profileName) {
    //     // If the user is not logged in, redirect to login page
    //     const navigate = useNavigate();
    //     navigate('/login');
    // }

    // Get the profile data from RTK query
    const { data, error, isLoading } = useGetProfileByNameQuery(profileName || user?.name);

    // if the current user is not logged in, redirect to login page.

    console.log('data: ', data);
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
                            <h1> Profile {data.name}</h1>
                            <Avatar
                                alt={data.name.toUpperCase()}
                                src={data.avatar !== '' ? data.avatar : 'this string ensures a letter'}
                            />
                        </Box>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
