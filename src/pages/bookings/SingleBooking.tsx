import { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress, Typography } from '@mui/material'
import { useGetBookingQuery } from '@/services/holidaze.ts'

export default function SingleBookingPage(): ReactElement {
    const { bookingId } = useParams()
    if (bookingId === undefined) {
        const navigate = useNavigate()
        navigate(-1)
        return <div />
    } else {
        const { data, error, isLoading } = useGetBookingQuery(bookingId)

        if (isLoading) return <CircularProgress />
        if (error != null) return <Typography>Ooops! there was an error getting the booking!</Typography>
        return (
            <>
                <Typography variant="h2" component="h1">
                    Booking
                </Typography>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </>
        )
    }
}
