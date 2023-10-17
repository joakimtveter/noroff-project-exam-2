import { useGetVenuesQuery } from '@/services/holidaze';

import Layout from '@/components/layout';
import VenueCard from '@/components/venue/venue-card';

import Container from '@/components/common/container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function AllVenuesPage() {
    const { data, error, isLoading } = useGetVenuesQuery('');

    return (
        <>
            <Layout>
                <Container>
                    <Typography component='h1' variant='h2'>
                        All venues
                    </Typography>
                    {error ? (
                        <p>Oh no, there was an error</p>
                    ) : isLoading ? (
                        <p>Loading...</p>
                    ) : data ? (
                        <Grid container component='ul' gap={2} sx={{ listStyleType: 'none', padding: 0 }}>
                            {data.map((venue) => (
                                <VenueCard key={venue.id} headingLevel={2} {...venue} />
                            ))}
                        </Grid>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
