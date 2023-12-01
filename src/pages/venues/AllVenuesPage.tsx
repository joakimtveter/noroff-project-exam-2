import { ReactElement, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetVenuesQuery } from '@/services/holidaze'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid,
    Rating,
    Slider,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import FilterIcon from '@mui/icons-material/FilterAltOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined'

import VenueList from '@/components/venue/venue-list'
import { Venue } from '@/types/venue.ts'

export default function AllVenuesPage(): ReactElement {
    const { data, isError, error, isLoading } = useGetVenuesQuery()
    const [searchParams, setSearchParams] = useSearchParams()
    const [expanded, setExpanded] = useState<boolean>(false)
    const theme = useTheme()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

    const setParams = (key: string, value: string): void => {
        if (value === 'false' || value === '' || value === '1') {
            searchParams.delete(key)
        } else {
            searchParams.set(key, value)
        }
        setSearchParams(searchParams)
    }

    const sliderValues = (values: string | null): number[] => {
        if (values === null) return [1, 10000]
        const array = values.split('-')
        return array.map((value) => parseInt(value))
    }

    const highPrice =
        data?.reduce((max, current): number => {
            return current.price > max ? current.price : max
        }, data[0].price) ?? 10000

    const sliderMaxValue = highPrice < 20000 ? highPrice : 20000

    const filterVenues = (venues: Venue[], params: URLSearchParams): Venue[] => {
        return venues
            .filter((venue) => {
                const q = params.get('q')
                if (q === null) return true
                if (venue.name.toLowerCase().includes(q.toLowerCase())) return true
                if (venue.location.city.toLowerCase().includes(q.toLowerCase())) return true
                if (venue.location.country.toLowerCase().includes(q.toLowerCase())) return true
                return venue.location.continent.toLowerCase().includes(q.toLowerCase())
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
                return Number(rating) <= venue.rating
            })
            .filter((venue) => {
                const guests = params.get('guests')
                if (guests === null) return true
                return Number(guests) <= venue.maxGuests
            })
            .filter((venue) => {
                const price = params.get('price')
                if (price === null) return true
                const [min, max] = price.split('-')
                return +min <= venue.price && +max >= venue.price
            })
    }

    if (isError) console.error(error)

    return (
        <>
            <Typography component="h1" variant="h2" marginBlock={3}>
                Find your perfect venue
            </Typography>
            {isError ? (
                <p>Oh no, there was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : data != null ? (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Accordion
                            sx={{ width: '100%', padding: 2 }}
                            expanded={isLargeScreen ? true : expanded}
                            onChange={() => {
                                setExpanded(!expanded)
                            }}
                        >
                            <AccordionSummary expandIcon={isLargeScreen ? null : <ExpandMoreIcon />}>
                                <FilterIcon />
                                <Typography component="span" variant="h6">
                                    Filters
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
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
                                <Box marginBlock={1}>
                                    <Typography component="legend">Minimum rating:</Typography>
                                    <Rating
                                        color="primary"
                                        size="large"
                                        value={Number(searchParams.get('rating'))}
                                        style={{ color: theme.palette.primary.main }}
                                        onChange={(_, newValue) => {
                                            setParams('rating', newValue != null ? newValue.toString() : '')
                                        }}
                                    />
                                </Box>
                                <TextField
                                    margin="normal"
                                    label={'Guests'}
                                    type={'number'}
                                    inputProps={{ min: 1, max: 100 }}
                                    value={searchParams.get('guests') === null ? 1 : Number(searchParams.get('guests'))}
                                    onChange={(e) => {
                                        setParams('guests', e.target.value)
                                    }}
                                />
                                <Box paddingInline={1} marginBlock={1}>
                                    <Typography component="legend">Price Range:</Typography>
                                    <Slider
                                        getAriaLabel={() => 'Price range'}
                                        min={1}
                                        max={sliderMaxValue}
                                        value={sliderValues(searchParams.get('price'))}
                                        onChange={(_event, values): void => {
                                            if (Array.isArray(values)) {
                                                setParams('price', values[0] + '-' + values[1])
                                            }
                                        }}
                                        valueLabelDisplay="auto"
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <VenueList venues={filterVenues(data, searchParams)} />
                    </Grid>
                </Grid>
            ) : null}
        </>
    )
}
