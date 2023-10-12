import { useParams, useNavigate } from 'react-router-dom';
import { useGetVenueByIdQuery } from '@/services/holidaze';
import Layout from '@/components/layout/standard-layout';
import Container from '@/components/common/container';
import ProfileCard from '@/components/common/profile-card';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VenueGallery from '@/components/venue/venue-gallery';

import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import Badge from '@mui/material/Badge';

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
                            <VenueGallery images={data.media} />
                            {/* {data.media.length == 1 ? (
                                <img style={{ width: '400px' }} src={data.media[0]} alt='' />
                            ) : null}
                            {data.media.length > 1
                                ? data.media.map((media, index) => (
                                      <img key={index} style={{ width: '400px' }} src={media} alt='' />
                                  ))
                                : null} */}
                            <Typography component='h1' variant='h2'>
                                {data.name}
                            </Typography>
                            <Typography component='p' variant='h5'>
                                {data.description}
                            </Typography>

                            <Paper elevation={2}>
                                <Stack spacing={1} direction={'row'}>
                                    <Rating name='read-only' value={data.rating} readOnly />
                                </Stack>
                                <Stack spacing={1} direction={'row'}>
                                    <Badge badgeContent={4} color='primary'>
                                        <PeopleOutlinedIcon color='action' />
                                    </Badge>
                                    {data.meta.wifi && <WifiOutlinedIcon />}
                                    {data.meta.pets && <PetsOutlinedIcon />}
                                    {data.meta.parking && <LocalParkingOutlinedIcon />}
                                    {data.meta.breakfast && <BakeryDiningOutlinedIcon />}
                                </Stack>
                            </Paper>

                            <Paper elevation={2}>
                                <Typography>
                                    Max no. of Guests: <Box component='span'>{data.maxGuests}</Box>
                                </Typography>

                                <Typography>Wifi Available: {data.meta.wifi ? 'Yes' : 'No'}</Typography>
                                <Typography>Pets Allowed: {data.meta.pets ? 'Yes' : 'No'}</Typography>
                                <Typography>Parking Available: {data.meta.parking ? 'Yes' : 'No'}</Typography>
                                <Typography>Breakfast Served: {data.meta.breakfast ? 'Yes' : 'No'}</Typography>
                                <Typography>Rating: {data.rating}</Typography>
                                <Stack spacing={1}>
                                    <Typography component='legend'>Rating:</Typography>
                                    <Rating name='read-only' value={data.rating} readOnly />
                                    <Typography>{data.rating}</Typography>
                                </Stack>
                            </Paper>
                            <div>
                                <ProfileCard
                                    name={data.owner.name}
                                    avatar={data.owner.avatar}
                                    email={data.owner.email}
                                />
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