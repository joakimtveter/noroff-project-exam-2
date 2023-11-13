import { ReactElement } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetVenuesQuery } from '@/services/holidaze'
import { CircularProgress, Typography } from '@mui/material'

import VenueList from '@/components/venue/venue-list'

export default function SearchResultsPage(): ReactElement {
    const { data, error, isLoading } = useGetVenuesQuery('')
    const [searchParams] = useSearchParams()
    const term = searchParams.get('q') ?? ''

    const venues = data?.filter((venue): boolean => {
        if (venue.name.toLowerCase().includes(term.toLowerCase())) return true
        if (venue.location.address.toLowerCase().includes(term.toLowerCase())) return true
        if (venue.location.city.toLowerCase().includes(term.toLowerCase())) return true
        if (venue.location.country.toLowerCase().includes(term.toLowerCase())) return true
        if (venue.location.continent.toLowerCase().includes(term.toLowerCase())) return true

        return false
    })

    return (
        <>
            <Typography component="h1" variant="h2" sx={{ marginBlock: 2 }}>
                Search Results for &quot;{term}&quot;
            </Typography>
            {error != null ? (
                <p>Oh no, there was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <VenueList venues={venues} />
            ) : null}
        </>
    )
}
