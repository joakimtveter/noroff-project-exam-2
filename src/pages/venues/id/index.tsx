import { useParams, useNavigate } from 'react-router-dom';
import { useGetVenueByIdQuery } from '@/services/holidaze';
import Layout from '@/components/layout/standard-layout';
import Container from '@/components/common/container';
import ProfileCard from '@/components/common/profile-card';
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
import Tooltip from '@mui/material/Tooltip';

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
                            <Stack direction='row' alignItems='baseline' gap={3}>
                                <Typography component='h1' variant='h2'>
                                    {data.name}
                                </Typography>
                                <Stack spacing={2}>
                                    <Stack spacing={3} direction={'row'}>
                                        <Tooltip title={`Maximum ${data.maxGuests} guests`}>
                                            <Badge badgeContent={data.maxGuests} color='primary'>
                                                <PeopleOutlinedIcon sx={{ color: 'text.purple' }} />
                                            </Badge>
                                        </Tooltip>
                                        {data.meta.wifi && (
                                            <Tooltip title={'Has Wifi'}>
                                                <WifiOutlinedIcon sx={{ color: 'text.purple' }} />
                                            </Tooltip>
                                        )}
                                        {data.meta.pets && (
                                            <Tooltip title={'Pets allowed'}>
                                                <PetsOutlinedIcon sx={{ color: 'text.purple' }} />
                                            </Tooltip>
                                        )}
                                        {data.meta.parking && (
                                            <Tooltip title={'Parking available'}>
                                                <LocalParkingOutlinedIcon sx={{ color: 'text.purple' }} />
                                            </Tooltip>
                                        )}
                                        {data.meta.breakfast && (
                                            <Tooltip title={'Breakfast included'}>
                                                <BakeryDiningOutlinedIcon sx={{ color: 'text.purple' }} />
                                            </Tooltip>
                                        )}
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack spacing={1} direction={'row'} alignItems='center'>
                                <Rating name='read-only' value={data.rating} readOnly />
                                <Typography>{data.rating}</Typography>
                            </Stack>
                            <Typography component='p' variant='h5'>
                                {data.description}
                            </Typography>

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

                            <ProfileCard name={data.owner.name} avatar={data.owner.avatar} email={data.owner.email} />
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
