import { ReactElement, useEffect } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
    Box,
    Button,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Paper,
    Rating,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'

import PeopleIcon from '@mui/icons-material/People'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import ClearIcon from '@mui/icons-material/Clear'

const schema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(255, { message: "Name can't be longer than 255 characters" }),
    description: z.string().min(1, { message: 'Description is required' }),
    media: z.array(z.string().url({ message: 'Must be a valid URL' })),
    price: z.number().min(1, { message: 'Price is required' }),
    maxGuests: z
        .number()
        .min(1, { message: 'Maximum number of guests is required' })
        .max(100, { message: "Maximum number of guests can't be more than 100" }),
    rating: z.number().min(0, { message: 'Rating is required' }).max(5, { message: "Rating can't be more than 5" }),
    meta: z.object({
        wifi: z.boolean(),
        parking: z.boolean(),
        breakfast: z.boolean(),
        pets: z.boolean(),
    }),
    location: z.object({
        address: z.string().min(1, { message: 'Address is required' }),
        city: z.string().min(1, { message: 'City is required' }),
        zip: z.string().min(1, { message: 'Zip is required' }),
        country: z.string().min(1, { message: 'Country is required' }),
        continent: z.string().min(1, { message: 'Continent is required' }),
        lat: z
            .number()
            .min(-90, { message: "Latitude can't be less than -90" })
            .max(90, { message: "Latitude can't be more than 90" }),
        lng: z
            .number()
            .min(-180, { message: "Longitude can't be less than -180" })
            .max(180, { message: "Longitude can't be more than 180" }),
    }),
})

export type VenueFormSchema = z.infer<typeof schema>
type VenueFormSchemaKeys = keyof VenueFormSchema

interface VenueFormProps {
    onSubmit: SubmitHandler<VenueFormSchema>
    submitButtonText: string
    defaultValues?: VenueFormSchema
}

export default function VenueForm(props: VenueFormProps): ReactElement {
    const { submitButtonText, onSubmit, defaultValues } = props
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset,
    } = useForm<VenueFormSchema>({ resolver: zodResolver(schema) })
    // @ts-expect-error - I don't know how to fix this, but it works.
    const { fields, append, remove } = useFieldArray({ name: 'media', control })

    const setNumberValue = (name: VenueFormSchemaKeys, value: string): void => {
        const number = parseInt(value)
        setValue(name, isNaN(number) ? 0 : number)
    }

    const setRating = (value: number | null): void => {
        if (value === null) {
            setValue('rating', 0)
        } else {
            setValue('rating', value)
        }
    }

    console.log('errors: ', errors)

    useEffect(() => {
        console.log('defaultValues: ', defaultValues)
        reset(defaultValues)
    }, [])

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '600px' }}>
            <TextField
                autoComplete="username"
                id="name"
                label="Name"
                margin="normal"
                {...register('name')}
                helperText={errors.name?.message}
                error={errors.name != null}
                fullWidth
                required
            />

            <TextField
                id="description"
                label="Description"
                margin="normal"
                multiline={true}
                {...register('description')}
                helperText={errors.description?.message}
                error={errors.description != null}
                fullWidth
                required
            />

            <Stack sx={{ maxWidth: '250px' }}>
                <TextField
                    id="price"
                    label="Price per night"
                    variant="outlined"
                    margin="normal"
                    inputProps={{ inputMode: 'numeric', style: { textAlign: 'end' } }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kr</InputAdornment>,
                    }}
                    {...register('price', { valueAsNumber: true })}
                    onChange={(event) => {
                        setNumberValue('price', event.target.value)
                    }}
                    helperText={errors.price?.message}
                    error={errors.price != null}
                    fullWidth
                />
                <TextField
                    id="maxGuests"
                    label="Maximum number of guest"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    inputProps={{ inputMode: 'numeric', style: { textAlign: 'end' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PeopleIcon />
                            </InputAdornment>
                        ),
                    }}
                    {...register('maxGuests', { valueAsNumber: true })}
                    onChange={(event) => {
                        setNumberValue('maxGuests', event.target.value)
                    }}
                    helperText={errors.maxGuests?.message}
                    error={errors.maxGuests != null}
                    fullWidth
                />
            </Stack>

            <Box sx={{ marginBlock: 2 }}>
                {fields.map((field, index: number) => (
                    <Stack key={field.id} direction="row">
                        <TextField
                            key={field.id}
                            label={`Image ${index + 1}`}
                            type="url"
                            variant="outlined"
                            margin="normal"
                            {...register(`media.${index}` as const)}
                            fullWidth
                            error={errors.media?.[index] != null}
                            helperText={errors.media?.[index]?.message}
                        />
                        <IconButton
                            onClick={(): void => {
                                remove(index)
                            }}
                        >
                            <ClearIcon color="error" />
                        </IconButton>
                    </Stack>
                ))}
                <Button
                    variant="outlined"
                    type="button"
                    onClick={() => {
                        append(' ')
                    }}
                >
                    Add Image
                </Button>
            </Box>

            <Box>
                <Typography component="legend">{'Rating'}</Typography>
                <input type="hidden" {...register('rating', { valueAsNumber: true })} />
                <Rating
                    size={'large'}
                    precision={1}
                    max={5}
                    onChange={(_event, value) => {
                        setRating(value)
                    }}
                    sx={{ color: 'primary.main' }}
                />
            </Box>
            <Stack sx={{ maxWidth: '400px', marginBlock: 4 }}>
                <Paper sx={{ padding: 4 }}>
                    <Typography component="legend" variant="h4">
                        Meta
                    </Typography>
                    <FormControlLabel
                        control={<Switch {...register('meta.wifi')} sx={{ marginLeft: 5 }} />}
                        label={'Wifi available'}
                        labelPlacement="start"
                        sx={{ width: '100%', justifyContent: 'space-between' }}
                    />
                    <FormControlLabel
                        control={<Switch {...register('meta.parking')} sx={{ marginLeft: 5 }} />}
                        label={'Parking available'}
                        labelPlacement="start"
                        sx={{ width: '100%', justifyContent: 'space-between' }}
                    />
                    <FormControlLabel
                        control={<Switch {...register('meta.breakfast')} sx={{ marginLeft: 5 }} />}
                        label={'Breakfast included'}
                        labelPlacement="start"
                        sx={{ width: '100%', justifyContent: 'space-between' }}
                    />
                    <FormControlLabel
                        control={<Switch {...register('meta.pets')} sx={{ marginLeft: 5 }} />}
                        label={'Pets Allowed'}
                        labelPlacement="start"
                        sx={{ width: '100%', justifyContent: 'space-between' }}
                    />
                </Paper>
            </Stack>
            <Typography component="h2" variant="h4">
                Location
            </Typography>
            <TextField
                id="address"
                label="Address"
                {...register('location.address')}
                margin="normal"
                helperText={errors.location?.address?.message}
                error={errors.location?.address != null}
                fullWidth
                required
            />
            <TextField
                id="zip"
                label="Zip Code"
                margin="normal"
                {...register('location.zip')}
                helperText={errors.location?.zip?.message}
                error={errors.location?.zip != null}
                fullWidth
                required
            />
            <TextField
                id="city"
                label="City"
                margin="normal"
                autoComplete="address-level1"
                {...register('location.city')}
                helperText={errors.location?.city?.message}
                error={errors.location?.city != null}
                fullWidth
                required
            />
            <TextField
                id="country"
                label="Country"
                margin="normal"
                autoComplete="country-name"
                {...register('location.country')}
                helperText={errors.location?.country?.message}
                error={errors.location?.country != null}
                fullWidth
                required
            />
            <TextField
                id="continent"
                label="Continent"
                margin="normal"
                {...register('location.continent')}
                helperText={errors.location?.continent?.message}
                error={errors.location?.continent != null}
                fullWidth
                required
            />
            <TextField
                id="lat"
                label="Latitude"
                margin="normal"
                inputProps={{ inputMode: 'numeric', style: { textAlign: 'end' } }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{<AddLocationIcon />}</InputAdornment>,
                }}
                {...register('location.lat', { valueAsNumber: true })}
                helperText={errors.location?.lat?.message}
                error={errors.location?.lat != null}
                fullWidth
                required
            />
            <TextField
                id="lng"
                label="Longitude"
                margin="normal"
                inputProps={{ inputMode: 'numeric', style: { textAlign: 'end' } }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{<AddLocationIcon />}</InputAdornment>,
                }}
                {...register('location.lng', { valueAsNumber: true })}
                helperText={errors.location?.lng?.message}
                error={errors.location?.lng != null}
                fullWidth
                required
            />
            <Button type="submit" variant="contained" sx={{ marginBlock: 3 }}>
                {submitButtonText}
            </Button>
        </Box>
    )
}
