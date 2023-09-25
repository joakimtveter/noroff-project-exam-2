import Layout from '@/components/layout/standard-layout';
import { getVenues } from '@/api/';
import { Venue } from '@/types/venue';
import { useState, useEffect } from 'react';
import VenueCard from '@/components/venue/venue-card';
import { Link } from 'react-router-dom';

export default function homePage() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const fetchVenues = async () => {
        const venues: Promise<Venue[]> = await getVenues({ sort: 'rating', limit: 5 });
        setVenues(await venues);
    };
    useEffect(() => {
        fetchVenues();
    }, []);
    console.log('venues: ', venues);

    return (
        <>
            <Layout>
                <h1> Holidaze</h1>

                <h2>Trending Vacation homes</h2>
                <ul>
                    {venues.map((venue) => (
                        <VenueCard key={venue.id} {...venue} />
                    ))}
                </ul>
                <Link to='/venues'>View all venues</Link>
            </Layout>
        </>
    );
}
