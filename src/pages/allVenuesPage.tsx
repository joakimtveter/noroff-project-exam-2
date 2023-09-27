import Layout from '@/components/layout/standard-layout';
import { useGetVenuesQuery } from '@/services/holidaze';
import VenueCard from '@/components/venue/venue-card';
import Container from '@/components/common/container';

export default function AllVenuesPage() {
    const { data, error, isLoading } = useGetVenuesQuery('');

    return (
        <>
            <Layout>
                <Container>
                    <h1> All venues</h1>
                    {error ? (
                        <p>Oh no, there was an error</p>
                    ) : isLoading ? (
                        <p>Loading...</p>
                    ) : data ? (
                        <ul>
                            {data.map((venue) => (
                                <VenueCard key={venue.id} {...venue} />
                            ))}
                        </ul>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
