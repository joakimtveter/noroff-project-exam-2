import { useGetTrendingVenuesQuery } from '@/services/holidaze';
import { Link } from 'react-router-dom';

import Layout from '@/components/layout';
import VenueCard from '@/components/venue/venue-card';
import Container from '@/components/common/container';

import type { Venue } from '@/types/venue';
import CircularProgress from '@mui/material/CircularProgress';

export default function HomePage() {
    const { data, error, isLoading } = useGetTrendingVenuesQuery('');
    console.log('venues: ', data);

    return (
        <>
            <Layout>
                <Container>
                    <h1> Holidaze</h1>
                    {error ? (
                        <p>Oh no, there was an error</p>
                    ) : isLoading ? (
                        <CircularProgress />
                    ) : data ? (
                        <>
                            <h2>Trending Vacation homes</h2>
                            <ul>
                                {data.map((venue: Venue) => (
                                    <VenueCard key={venue.id} headingLevel={3} {...venue} />
                                ))}
                            </ul>
                            <Link to='/venues'>View all venues</Link>
                        </>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
