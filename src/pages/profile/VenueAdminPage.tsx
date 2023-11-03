import { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetVenueByIdQuery } from '@/services/holidaze'

import Layout from '@/components/layout'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import VenueBookingList from '@/components/venue/venue-booking-list'

// TODO: Guard this to Signed in user
export default function VenueAdminPage(): ReactElement {
    const navigate = useNavigate()
    const { venueId } = useParams()
    if (venueId === undefined) navigate('/404')
    const { data, error, isLoading } = useGetVenueByIdQuery(venueId ?? '')

    return (
        <Layout>
            {error != null ? (
                <p>Oh no, there was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <Box>
                    <Typography component="h1" variant="h2">
                        {data.name} - Venue Admin
                    </Typography>
                    <Typography component="p" variant="subtitle1">
                        Venue id: {venueId}
                    </Typography>
                    <Typography component="h2" variant="h4">
                        Bookings
                    </Typography>
                    <VenueBookingList bookings={data.bookings} />
                    <pre> {JSON.stringify(data, null, 2)}</pre>
                </Box>
            ) : null}
        </Layout>
    )
}
