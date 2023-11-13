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
} from '@mui/material'

import VenueList from '@/components/venue/venue-list'

export default function AllVenuesPage(): ReactElement {
    const { data, error, isLoading } = useGetVenuesQuery('')
    const [searchParams, setSearchParams] = useSearchParams()

    const setParams = (key: string, value: string): void => {
        if (value === 'false' || value === '') {
            searchParams.delete(key)
        } else {
            searchParams.set(key, value)
        }
        setSearchParams(searchParams)
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
                        <Paper>
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
                                        value={Number(searchParams.get('rating'))}
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
                                    value={searchParams.get('guests')}
                                    onChange={(e) => {
                                        setParams('guests', e.target.value)
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <VenueList
                            venues={data
                                .filter((venue) => {
                                    const q = searchParams.get('q')
                                    if (q === null) {
                                        return true
                                    } else {
                                        if (venue.name.toLowerCase().includes(q.toLowerCase())) return true
                                    }
                                    return false
                                })
                                .filter((venue) => {
                                    if (searchParams.get('wifi') === null) return true
                                    return searchParams.get('wifi') === 'true' && venue.meta.wifi
                                })
                                .filter((venue) => {
                                    if (searchParams.get('breakfast') === null) return true
                                    return searchParams.get('breakfast') === 'true' && venue.meta.breakfast
                                })
                                .filter((venue) => {
                                    if (searchParams.get('pets') === null) return true
                                    return searchParams.get('pets') === 'true' && venue.meta.pets
                                })
                                .filter((venue) => {
                                    if (searchParams.get('parking') === null) return true
                                    return searchParams.get('parking') === 'true' && venue.meta.parking
                                })
                                .filter((venue) => {
                                    const rating = searchParams.get('rating')
                                    if (rating === null) {
                                        return true
                                    } else {
                                        if (Number(rating) <= venue.rating) return true
                                    }
                                    return false
                                })
                                .filter((venue) => {
                                    const guests = searchParams.get('guests')
                                    if (guests === null) {
                                        return true
                                    } else {
                                        if (Number(guests) <= venue.maxGuests) return true
                                    }
                                    return false
                                })}
                        />
                    </Grid>
                </Grid>
            ) : null}
        </>
    )
}
