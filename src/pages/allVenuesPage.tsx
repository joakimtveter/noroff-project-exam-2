import Layout from '@/components/layout/standard-layout';
import { getVenues } from '@/api/';
import { Venue } from '@/types/venue';
import { useState, useEffect } from 'react';
import VenueCard from '@/components/venue/venue-card';

export default function AllVenuesPage() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const fetchVenues = async () => {
        const venues: Promise<Venue[]> = await getVenues();
        setVenues(await venues);
    };
    useEffect(() => {
        fetchVenues();
    }, []);
    console.log('venues: ', venues);

    return (
        <>
            <Layout>
                <h1> All venues</h1>
                <ul>
                    {venues.map((venue) => (
                        <VenueCard key={venue.id} {...venue} />
                    ))}
                </ul>
            </Layout>
        </>
    );
}
