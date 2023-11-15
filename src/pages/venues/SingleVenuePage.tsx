import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store.ts'
import { useGetVenueByIdQuery } from '@/services/holidaze'

import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { I18nProvider } from 'react-aria'

import BookingCalendar from '@/components/venue/booking-calendar'
import ProfileCard from '@/components/common/profile-card'
import VenueGallery from '@/components/venue/venue-gallery'
import VenueInfo from '@/components/venue/venue-info'
import VenueBookingList from '@/components/venue/venue-booking-list'
import formatCurrency from '@/utils/formatCurrency'

export default function SingleVenuePage(): ReactElement {
    const { venueId } = useParams()
    const { data, error, isLoading } = useGetVenueByIdQuery(venueId ?? '')
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const userName = useSelector((state: RootState) => state.user.user.name)
    const isOwnVenue = userName === data?.owner.name

    if (error != null) console.log(error)

    return (
        <>
            {error != null ? (
                <p>Oh no, there was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6}>
                        <VenueGallery images={data.media} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography component="h1" variant="h2" sx={{ marginBlockEnd: 4 }}>
                            {data.name}
                        </Typography>
                        <VenueInfo
                            wifi={data.meta.wifi}
                            pets={data.meta.pets}
                            rating={data.rating}
                            breakfast={data.meta.breakfast}
                            parking={data.meta.parking}
                            maxGuests={data.maxGuests}
                        />
                        <Typography component="p" variant="subtitle1" mb={2}>
                            {data.description}
                        </Typography>
                        <Typography component="p" variant="h4" color="primary">
                            <Box component="span" style={visuallyHidden}>
                                Price:
                            </Box>
                            {formatCurrency(data.price)} per night
                        </Typography>
                        <ProfileCard name={data.owner.name} avatar={data.owner.avatar} email={data.owner.email} />
                        <Paper elevation={2} sx={{ padding: 2, maxWidth: '500px', marginBlock: 2 }}>
                            <Typography component="h2" variant="h5">
                                Amenities
                            </Typography>
                            <Typography>
                                <Box component="span" sx={{ fontWeight: 600 }}>
                                    {'Maximum Guests: '}
                                </Box>
                                {data.maxGuests}
                            </Typography>
                            <Typography>
                                <Box component="span" sx={{ fontWeight: 600 }}>
                                    {'Wifi Available: '}
                                </Box>
                                {data.meta.wifi ? 'Yes' : 'No'}
                            </Typography>
                            <Typography>
                                <Box component="span" sx={{ fontWeight: 600 }}>
                                    {'Pets Allowed: '}
                                </Box>
                                {data.meta.pets ? 'Yes' : 'No'}
                            </Typography>
                            <Typography>
                                <Box component="span" sx={{ fontWeight: 600 }}>
                                    {'Parking Available: '}
                                </Box>
                                {data.meta.parking ? 'Yes' : 'No'}
                            </Typography>
                            <Typography>
                                <Box component="span" sx={{ fontWeight: 600 }}>
                                    {'Breakfast Included: '}
                                </Box>
                                {data.meta.breakfast ? 'Yes' : 'No'}
                            </Typography>
                        </Paper>
                        <Paper elevation={2} sx={{ padding: 2, maxWidth: '500px', marginBlock: 2 }}>
                            <Typography component="h2" variant="h5">
                                Location
                            </Typography>
                            <Typography component="address">
                                {data.location.address}
                                <br />
                                {data.location.zip + ' ' + data.location.city}
                                <br />
                                {data.location.country + ', ' + data.location.continent}
                            </Typography>
                        </Paper>
                        <Box sx={{ marginBlock: 2 }}>
                            {data.location.lat != null &&
                            data.location.lat !== 0 &&
                            data.location.lng != null &&
                            data.location.lng !== 0 ? (
                                <Typography component="p">
                                    Latitude: {data.location.lat} Longitude: {data.location.lng}
                                </Typography>
                            ) : null}
                        </Box>
                        <I18nProvider locale="en-NO">
                            <BookingCalendar
                                bookings={data.bookings}
                                maxGuests={data.maxGuests}
                                venueId={data.id}
                                enableBooking={isLoggedIn}
                            />
                        </I18nProvider>
                        {isOwnVenue && <VenueBookingList bookings={data.bookings} />}
                    </Grid>
                </Grid>
            ) : null}
        </>
    )
}
