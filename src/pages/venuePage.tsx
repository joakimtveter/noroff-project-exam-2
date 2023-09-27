import { useParams, useNavigate } from 'react-router-dom';
import { useGetVenueByIdQuery } from '@/services/holidaze';
import { useState, useEffect } from 'react';
import { getVenueById } from '@/api/';
import { VenueDetailed } from '@/types/venue';
import Layout from '@/components/layout/standard-layout';
import Container from '@/components/common/container';

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
    const navigate = useNavigate();
    const { venueId } = useParams();
    if (venueId == undefined) navigate('/404');
    const { data, error, isLoading } = useGetVenueByIdQuery(venueId || '');

    if (error) console.log(error);

    return (
        <>
            <Layout>
                <Container>
                    {error ? (
                        <p>Oh no, there was an error</p>
                    ) : isLoading ? (
                        <p>Loading...</p>
                    ) : data ? (
                        <div>
                            {data.media.length == 1 ? (
                                <img style={{ width: '400px' }} src={data.media[0]} alt='' />
                            ) : null}
                            {data.media.length > 1
                                ? data.media.map((media, index) => (
                                      <img key={index} style={{ width: '400px' }} src={media} alt='' />
                                  ))
                                : null}
                            <h1>{data.name}</h1>
                            <p>{data.description}</p>
                            <div>
                                <p>Max no. of Guests: {data.maxGuests}</p>
                                <p>Wifi Available: {data.meta.wifi ? 'Yes' : 'No'}</p>
                                <p>Pets Allowed: {data.meta.pets ? 'Yes' : 'No'}</p>
                                <p>Parking Available: {data.meta.parking ? 'Yes' : 'No'}</p>
                                <p>Breakfast Served: {data.meta.breakfast ? 'Yes' : 'No'}</p>
                                <p>Rating: {data.rating}</p>
                            </div>
                            <div>
                                <p>Owner: {data.owner.name}</p>
                                <img style={{ width: '200px' }} src={data.owner.avatar} alt='' />
                            </div>
                            <div>
                                <p>Address: {data.location.address}</p>
                                <p>City: {data.location.city}</p>
                                <p>Zip: {data.location.zip}</p>
                                <p>Country: {data.location.country}</p>
                                <p>Continent: {data.location.continent}</p>
                                {data.location.lat ? <p>Lat: {data.location.lat}</p> : null}
                                {data.location.lng ? <p>Lng: {data.location.lng}</p> : null}
                            </div>
                            <p>Price: ${data.price} per night</p>
                        </div>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
