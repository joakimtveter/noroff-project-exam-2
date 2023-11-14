import { ReactElement } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetVenuesQuery } from '@/services/holidaze'
import {
    Box,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    Rating,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'

import VenueList from '@/components/venue/venue-list'
import { Venue } from '@/types/venue.ts'

export default function AllVenuesPage(): ReactElement {
    const { data, error, isLoading } = useGetVenuesQuery('')
    const [searchParams, setSearchParams] = useSearchParams()
    const theme = useTheme()

    const setParams = (key: string, value: string): void => {
        if (value === 'false' || value === '' || value === '1') {
            searchParams.delete(key)
        } else {
            searchParams.set(key, value)
        }
        setSearchParams(searchParams)
    }

    const filterVenues = (venues: Venue[], params: URLSearchParams): Venue[] => {
        return venues
            .filter((venue) => {
                const q = params.get('q')
                if (q === null) return true
                const isMatch = Boolean(venue.name.toLowerCase().includes(q.toLowerCase()))
                return isMatch
            })
            .filter((venue) => {
                if (params.get('wifi') === null) return true
                return params.get('wifi') === 'true' && venue.meta.wifi
            })
            .filter((venue) => {
                if (params.get('breakfast') === null) return true
                return params.get('breakfast') === 'true' && venue.meta.breakfast
            })
            .filter((venue) => {
                if (params.get('pets') === null) return true
                return params.get('pets') === 'true' && venue.meta.pets
            })
            .filter((venue) => {
                if (params.get('parking') === null) return true
                return params.get('parking') === 'true' && venue.meta.parking
            })
            .filter((venue) => {
                const rating = params.get('rating')
                if (rating === null) return true
                return rating != null && Number(rating) <= venue.rating
            })
            .filter((venue) => {
                const guests = params.get('guests')
                if (guests === null) return true
                return guests != null && Number(guests) <= venue.maxGuests
            })
    }

    return (
        <>
            <Typography component="h1" variant="h2" marginBlock={3}>
                Find the perfect venue
            </Typography>
            {error != null ? (
                <p>Oh no, there was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={3}>
                            <Box sx={{ width: '100%', padding: 1 }}>
                                <Typography>Filters</Typography>
                                <TextField
                                    fullWidth={true}
                                    margin="normal"
                                    placeholder={'Search'}
                                    aria-label={'search'}
                                    type={'search'}
                                    value={searchParams.get('q') ?? ''}
                                    onChange={(e) => {
                                        setParams('q', e.target.value)
                                    }}
                                />
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox sx={{ marginInlineStart: 'auto' }} />}
                                        label="Wifi Available"
                                        labelPlacement="start"
                                        sx={{ marginInlineStart: 0 }}
                                        checked={searchParams.get('wifi') === 'true'}
                                        onChange={(_, checked): void => {
                                            setParams('wifi', checked.toString())
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{ marginInlineStart: 'auto' }} />}
                                        label="Breakfast included"
                                        labelPlacement="start"
                                        sx={{ marginInlineStart: 0 }}
                                        checked={searchParams.get('breakfast') === 'true'}
                                        onChange={(_, checked): void => {
                                            setParams('breakfast', checked.toString())
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{ marginInlineStart: 'auto' }} />}
                                        label="Pets Allowed"
                                        labelPlacement="start"
                                        sx={{ marginInlineStart: 0 }}
                                        checked={searchParams.get('pets') === 'true'}
                                        onChange={(_, checked): void => {
                                            setParams('pets', checked.toString())
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{ marginInlineStart: 'auto' }} />}
                                        label="Parking Awailable"
                                        labelPlacement="start"
                                        sx={{ marginInlineStart: 0 }}
                                        checked={searchParams.get('parking') === 'true'}
                                        onChange={(_, checked): void => {
                                            setParams('parking', checked.toString())
                                        }}
                                    />
                                </FormGroup>
                                <Box>
                                    <Typography component="legend">Minimum rating:</Typography>
                                    <Rating
                                        color="primary"
                                        value={Number(searchParams.get('rating'))}
                                        style={{ color: theme.palette.primary.main }}
                                        onChange={(_, newValue) => {
                                            setParams('rating', newValue != null ? newValue.toString() : '')
                                        }}
                                    />
                                </Box>
                                <TextField
                                    fullWidth={false}
                                    margin="normal"
                                    label={'Guests'}
                                    type={'number'}
                                    inputProps={{ min: 1, max: 100 }}
                                    value={searchParams.get('guests') === null ? 1 : Number(searchParams.get('guests'))}
                                    onChange={(e) => {
                                        setParams('guests', e.target.value)
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <VenueList venues={filterVenues(data, searchParams)} />
                    </Grid>
                </Grid>
            ) : null}
        </>
    )
}
