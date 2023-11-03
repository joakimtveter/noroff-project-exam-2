import { ReactElement } from 'react'
import { useGetVenuesQuery } from '@/services/holidaze'
import { CircularProgress, Container, Grid, Typography } from '@mui/material'

import Layout from '@/components/layout'
import VenueCard from '@/components/venue/venue-card'

export default function AllVenuesPage(): ReactElement {
    const { data, error, isLoading } = useGetVenuesQuery('')

    return (
        <>
            <Layout>
                <Container>
                    <Typography component="h1" variant="h2">
                        All venues
                    </Typography>
                    {error != null ? (
                        <p>Oh no, there was an error</p>
                    ) : isLoading ? (
                        <CircularProgress />
                    ) : data != null ? (
                        <Grid container component="ul" spacing={2} sx={{ listStyleType: 'none', padding: 0 }}>
                            {data.map((venue) => (
                                <Grid item key={venue.id} component="li" xs={12} sm={6} md={3}>
                                    <VenueCard headingLevel={2} {...venue} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : null}
                </Container>
            </Layout>
        </>
    )
}
