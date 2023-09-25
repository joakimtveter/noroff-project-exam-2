import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getVenueById } from '@/api/';
import { VenueDetailed } from '@/types/venue';

const initialVenue: VenueDetailed = {
    name: '',
    description: '',
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
        wifi: false,
        pets: false,
        parking: false,
        breakfast: false,
    },
    owner: {
        name: '',
        email: '',
        avatar: '',
    },
    id: '',
    created: '',
    updated: '',
    location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        lat: 0,
        lng: 0,
    },
    bookings: [],
};

export default function VenuePage() {
    const { venueId } = useParams();
    const [venue, setVenue] = useState(initialVenue);

    const fetchVenue = async () => {
        if (!venueId) return;
        const venue = await getVenueById(venueId);
        console.log('venue: ', venue);
        setVenue(venue);
    };
    useEffect(() => {
        fetchVenue();
    }, []);
    return (
        <>
            <div>
                {venue.media.length == 1 ? <img style={{ width: '400px' }} src={venue.media[0]} alt='' /> : null}
                {venue.media.length > 1
                    ? venue.media.map((media, index) => (
                          <img key={index} style={{ width: '400px' }} src={media} alt='' />
                      ))
                    : null}
                <h1>{venue.name}</h1>
                <p>{venue.description}</p>
                <div>
                    <p>Max no. of Guests: {venue.maxGuests}</p>
                    <p>Wifi Available: {venue.meta.wifi ? 'Yes' : 'No'}</p>
                    <p>Pets Allowed: {venue.meta.pets ? 'Yes' : 'No'}</p>
                    <p>Parking Available: {venue.meta.parking ? 'Yes' : 'No'}</p>
                    <p>Breakfast Served: {venue.meta.breakfast ? 'Yes' : 'No'}</p>
                    <p>Rating: {venue.rating}</p>
                </div>
                <div>
                    <p>Owner: {venue.owner.name}</p>
                    <img style={{ width: '200px' }} src={venue.owner.avatar} alt='' />
                </div>
                <div>
                    <p>Address: {venue.location.address}</p>
                    <p>City: {venue.location.city}</p>
                    <p>Zip: {venue.location.zip}</p>
                    <p>Country: {venue.location.country}</p>
                    <p>Continent: {venue.location.continent}</p>
                    {venue.location.lat ? <p>Lat: {venue.location.lat}</p> : null}
                    {venue.location.lng ? <p>Lng: {venue.location.lng}</p> : null}
                </div>
                <p>Price: ${venue.price} per night</p>
            </div>
        </>
    );
}
