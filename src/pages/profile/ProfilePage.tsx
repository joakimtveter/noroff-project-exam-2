import { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useGetProfileByNameQuery } from '@/services/holidaze'
import { RootState } from '@/store'

import { Avatar, Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'

import VenueCard from '@/components/venue/venue-card'
import { Helmet } from 'react-helmet'

export default function ProfilePage(): ReactElement {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const { profileName } = useParams<{ profileName: string }>()
    const navigate = useNavigate()
    if (!isLoggedIn) {
        toast.info('You are not logged in', { toastId: 'not-logged-in' })
        navigate('/sign-in')
    }

    const { data, isError, error, isLoading } = useGetProfileByNameQuery(profileName ?? '')
    if (isError) console.error(error)

    return (
        <>
            {isError ? (
                <>
                    <p>Oh no, there was an error</p>
                </>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <Box marginBlock={3}>
                    <Helmet>
                        <title>{`${data.name}'s profile | Holidaze`}</title>
                    </Helmet>
                    <Stack direction="row" alignItems="center" gap={4} marginBlock={4}>
                        <Avatar
                            alt={data.name.toLocaleUpperCase()}
                            src={data.avatar}
                            sx={{ width: { xs: 100, md: 200 }, height: { xs: 100, md: 200 } }}
                        />
                        <Stack component="hgroup" spacing={1}>
                            <Typography component="h1" variant="h3">
                                {' '}
                                {data.name}
                            </Typography>
                            <Typography component="p" variant="subtitle1">
                                {' '}
                                {data.email}
                            </Typography>
                        </Stack>
                    </Stack>
                    {data.venueManager === true && data._count.venues > 0 && (
                        <Box>
                            <Typography component="h2" variant="h4" marginBlock={2}>
                                Venues
                            </Typography>
                            <Grid container component="ul" spacing={2} sx={{ listStyleType: 'none', padding: 0 }}>
                                {data.venues.map((venue) => (
                                    <Grid item key={venue.id} component="li" xs={12} sm={6} md={4} lg={3}>
                                        <VenueCard headingLevel={3} {...venue} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Box>
            ) : null}
        </>
    )
}
