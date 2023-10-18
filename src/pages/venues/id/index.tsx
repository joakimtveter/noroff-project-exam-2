import { useParams, useNavigate } from 'react-router-dom';
import { useGetVenueByIdQuery } from '@/services/holidaze';


import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

import BookingCalendar from '@/components/venue/booking-calendar';
import Container from '@/components/common/container';
import Layout from '@/components/layout';
import ProfileCard from '@/components/common/profile-card';
import VenueGallery from '@/components/venue/venue-gallery';

import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import Paper from '@mui/material/Paper';

export default function VenuePage() {
    const navigate = useNavigate();
    const { venueId } = useParams();
    if (venueId == undefined) navigate('/404');
    const { data, error, isLoading } = useGetVenueByIdQuery(venueId || '');

    if (error) console.log(error);
    const formatedPrice = data ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(data.price ?? 0) : '';


    return (
        <>
            <Layout>
                <Container>
                    {error ? (
                        <p>Oh no, there was an error</p>
                    ) : isLoading ? (
                        <p>Loading...</p>
                    ) : data ? (
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} md={6} >
                                <VenueGallery images={data.media} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography component='h1' variant='h2'>
                                    {data.name}
                                </Typography>
                                <Stack spacing={3} direction={'row'} alignItems={'center'} pb={2}>
                                    <Stack spacing={1} direction={'row'} alignItems='center'>
                                        <Rating name='read-only' value={data.rating} readOnly />
                                        <Typography>{data.rating}</Typography>
                                    </Stack>
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
                                <Typography component='p' variant='subtitle1' mb={2}>
                                    {data.description}
                                </Typography>
                                <Typography component='p' variant='h4' color='primary'>
                                    <Box component='span' style={visuallyHidden}>Price:</Box>
                                    {formatedPrice} per night
                                </Typography>
                                <ProfileCard name={data.owner.name} avatar={data.owner.avatar} email={data.owner.email} />
                                <Paper elevation={2} sx={{padding: 2, maxWidth: '500px', marginBlock: 2}}>
                                    <Typography component='h2' variant='h5'>Amenities</Typography>
                                    <Typography>
                                        <Box component='span' sx={{fontWeight: 600}}>
                                        {'Maximum Guests: '} 
                                        </Box>
                                        {data.maxGuests}
                                    </Typography>
                                    <Typography>
                                        <Box component='span' sx={{fontWeight: 600}}>{'Wifi Available: '}</Box>
                                        {data.meta.wifi ? 'Yes' : 'No'}
                                    </Typography>
                                    <Typography>
                                        <Box component='span' sx={{fontWeight: 600}}>{'Pets Allowed: '}</Box>
                                        {data.meta.pets ? 'Yes' : 'No'}
                                        </Typography>
                                    <Typography>
                                        <Box component='span' sx={{fontWeight: 600}}>{'Parking Available: '}</Box>
                                        {data.meta.parking ? 'Yes' : 'No'}
                                    </Typography>
                                    <Typography>
                                        <Box component='span' sx={{fontWeight: 600}}>{'Breakfast Included: '}</Box>
                                        {data.meta.breakfast ? 'Yes' : 'No'}
                                    </Typography>
                                </Paper>
                                <Paper elevation={2} sx={{padding: 2, maxWidth: '500px', marginBlock: 2}}>
                                    <Typography component='h2' variant='h5'>Location</Typography>
                                    <Typography component='address'>
                                        {data.location.address}
                                        <br />
                                        {data.location.zip + ' ' + data.location.city}
                                        <br />
                                        {data.location.country + ', ' + data.location.continent}
                                    </Typography>
                                </Paper>
                                <Box sx={{marginBlock: 2}}>
                                    {data.location.lat & data.location.lng ? <Typography component='p'>Latitude: {data.location.lat} Longitude: {data.location.lng}</Typography> : null}
                                </Box>
                                <BookingCalendar bookings={[]} />
                            </Grid>
                        </Grid>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
