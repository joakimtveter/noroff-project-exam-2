import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

import VenueCard from '@/components/venue/venue-card'

import { useGetTrendingVenuesQuery } from '@/services/holidaze'

export default function HomePage(): ReactElement {
    const { data, error, isLoading } = useGetTrendingVenuesQuery('')

    return (
        <>
            <Typography component="h1" style={visuallyHidden}>
                {' '}
                Holidaze - Find your next Holiday Stay!
            </Typography>
            {error != null ? (
                <p>Oh no, there was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <>
                    <Typography component="h2" variant="h2">
                        Trending Vacation homes
                    </Typography>
                    <Typography component="p" variant="subtitle2"></Typography>
                    <Grid container component="ul" spacing={2} sx={{ listStyleType: 'none', padding: 0 }}>
                        {data.map((venue) => (
                            <Grid item key={venue.id} xs={12} md={4}>
                                <VenueCard key={venue.id} headingLevel={3} {...venue} />
                            </Grid>
                        ))}
                    </Grid>
                    <Stack direction="row" justifyContent="center" paddingBlock={4}>
                        <Button component={Link} to="/venues" variant="contained">
                            View All Venues
                        </Button>
                    </Stack>
                </>
            ) : null}
        </>
    )
}
