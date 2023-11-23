import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

import VenueCard from '@/components/venue/venue-card'

import { useGetTrendingVenuesQuery } from '@/services/holidaze'
import image from '@/assets/photo-1602002418816-5c0aeef426aa.webp'

export default function HomePage(): ReactElement {
    const { data, error, isLoading } = useGetTrendingVenuesQuery()

    return (
        <>
        <Grid container sx={{backgroundColor: 'primary.light', marginBlockEnd: 6}}>
            <Grid item xs={12} md={6}  sx={{display: 'grid', placeItems: 'center', padding: 2}}>
                <Box component='hgroup'>
                    <Typography component="h1" variant='h2'>
                        <Box component={'span'} sx={visuallyHidden}>
                        Holidaze
                        </Box>
                        Find your next Holiday Stay!
                    </Typography>
                    <Typography component="p" variant='h5'>
                        Holidaze is a fictional hotel booking website created as a part of a school project.
                    </Typography>
                </Box>
            </Grid>
            <Grid item md={6} component='figure' sx={{aspectRatio: '1 / 1', }}>
                <img src={image} alt='A nice white beach with two sunbeds and palmtrees. The skye is blue, and the water is nice and clear' style={{objectFit: 'cover', height: '100%'}} />
            </Grid>
        </Grid>
            {error != null ? (
                <p>Oh no, there was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <>
                    <Typography component="h2" variant="h3" marginBlock={2}>
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
