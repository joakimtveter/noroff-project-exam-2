import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store.ts'
import { useGetVenueByIdQuery } from '@/services/holidaze'

import { Box, CircularProgress, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { I18nProvider } from 'react-aria'

import BookingCalendar from '@/components/venue/booking-calendar'
import ProfileCard from '@/components/common/profile-card'
import VenueGallery from '@/components/venue/venue-gallery'
import VenueInfo from '@/components/venue/venue-info'
import VenueBookingList from '@/components/venue/venue-booking-list'
import formatCurrency from '@/utils/formatCurrency'
import VenueMap from '@/components/venue/map'
import EditIcon from '@mui/icons-material/Edit'
import { Helmet } from 'react-helmet'

export default function SingleVenuePage(): ReactElement {
    const { venueId } = useParams()
    const { data, isError, error, isLoading } = useGetVenueByIdQuery(venueId ?? '')
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const userName = useSelector((state: RootState) => state.user.user.name)
    const isOwnVenue = userName === data?.owner.name

    function validateCoords(lat: number | undefined, lng: number | undefined): boolean {
        if (lat === undefined || lng === undefined) return false
        if (lat === 0 && lng === 0) return false
        if (lat < -90 || lat > 90) return false
        return !(lng < -180 || lng > 180)
    }
    const isValidCoords = validateCoords(data?.location.lat, data?.location.lng)

    if (error != null) console.error(error)

    return (
        <>
            {isError ? (
                <p>Oh no, there was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <Container maxWidth="md">
                    <Helmet>
                        <title>{`${data.name} | Holidaze`}</title>
                        <meta name="description" content={data.description} />
                    </Helmet>
                    <Box component="hgroup" sx={{ marginBlock: 2 }}>
                        <Typography component="h1" variant="h2">
                            {data.name}
                            {isOwnVenue && (
                                <Tooltip title="Edit venue">
                                    <IconButton aria-label="edit venue" href={`/venues/edit/${data.id}/`}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Typography>
                        <VenueInfo
                            wifi={data.meta.wifi}
                            pets={data.meta.pets}
                            rating={data.rating}
                            breakfast={data.meta.breakfast}
                            parking={data.meta.parking}
                            maxGuests={data.maxGuests}
                        />
                    </Box>
                    <VenueGallery images={data.media} />
                    <Typography component="p" variant="subtitle1" mb={2} fontSize={'120%'}>
                        {data.description}
                    </Typography>
                    <Typography component="p" variant="h4" color="primary">
                        <Box component="span" style={visuallyHidden}>
                            Price:
                        </Box>
                        {formatCurrency(data.price)} per night
                    </Typography>
                    <Box component="section" sx={{ marginBlock: 2 }}>
                        <Typography component="h2" variant="h5">
                            Host
                        </Typography>
                        <ProfileCard name={data.owner.name} avatar={data.owner.avatar} email={data.owner.email} />
                    </Box>
                    <Box sx={{ padding: 2, maxWidth: '700px', marginBlock: 2 }}>
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
                    </Box>

                    <Box component="section" sx={{ padding: 2, marginBlock: 2 }}>
                        <Typography component="h2" variant="h5" marginBlockEnd={2}>
                            Location
                        </Typography>
                        <Grid container spacing={2}>
                            {isValidCoords && (
                                <Grid item xs={12} md={8}>
                                    <VenueMap lat={data.location.lat} lng={data.location.lng} />
                                </Grid>
                            )}
                            <Grid item xs={12} md={isValidCoords ? 4 : 12}>
                                <Typography component="address" variant="subtitle1">
                                    {data.location.address}
                                    <br />
                                    {data.location.zip + ' ' + data.location.city}
                                    <br />
                                    {data.location.country + ', ' + data.location.continent}
                                </Typography>
                                {isValidCoords && (
                                    <Box marginBlock={2}>
                                        <Typography component="p">
                                            <Box component="span" sx={{ fontWeight: 600 }}>
                                                {'Latitude: '}
                                            </Box>
                                            {data.location.lat}
                                        </Typography>
                                        <Typography component="p">
                                            <Box component="span" sx={{ fontWeight: 600 }}>
                                                {'Longitude: '}
                                            </Box>
                                            {data.location.lng}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="section" sx={{ padding: 2, marginBlock: 2 }}>
                        <I18nProvider locale="en-NO">
                            <BookingCalendar
                                bookings={data.bookings}
                                maxGuests={data.maxGuests}
                                venueId={data.id}
                                enableBooking={isLoggedIn}
                            />
                        </I18nProvider>
                    </Box>

                    {isOwnVenue && (
                        <Box component="section">
                            <VenueBookingList bookings={data.bookings} />
                        </Box>
                    )}
                </Container>
            ) : null}
        </>
    )
}
