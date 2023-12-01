import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteVenueMutation } from '@/services/holidaze.ts'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
    Box,
    Button,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Rating,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'

import PeopleIcon from '@mui/icons-material/People'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import ClearIcon from '@mui/icons-material/Clear'
import AlertDialog from '@/components/common/dialog'
import { toast } from 'react-toastify'

const schema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(255, { message: "Name can't be longer than 255 characters" }),
    description: z.string().min(1, { message: 'Description is required' }),
    media: z.array(z.string().url({ message: 'Must be a valid URL' })).optional(),
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
    enableDelete?: boolean
    id?: string
}

export default function VenueForm(props: VenueFormProps): ReactElement {
    const { submitButtonText, onSubmit, defaultValues, enableDelete = false, id } = props
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
    const [open, setOpen] = useState(false)
    const [deleteVenue] = useDeleteVenueMutation()
    const navigate = useNavigate()

    const goBack = (): void => {
        navigate(-1)
    }

    const handleOpen = (): void => {
        setOpen(true)
    }
    const handleClose = (): void => {
        setOpen(false)
    }
    const handleDelete = async (id: string): Promise<void> => {
        if (id === '') {
            toast.error('Failed to delete.')
            return
        }
        await deleteVenue(id).unwrap()
        setOpen(false)
        navigate('/profile')
    }

    const setNumberValue = (name: VenueFormSchemaKeys, value: string): void => {
        const number = parseInt(value)
        setValue(name, isNaN(number) ? 0 : number)
    }

    useEffect(() => {
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

            <Box component="fieldset" sx={{ border: 'none' }}>
                <Typography component="legend">{'Rating'}</Typography>
                <Controller
                    name="rating"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                        <Rating
                            {...field}
                            size={'large'}
                            sx={{ color: 'primary.main' }}
                            onChange={(_e, value) => {
                                field.onChange(value ?? 0)
                            }}
                        />
                    )}
                />
            </Box>
            <Stack sx={{ maxWidth: '400px', marginBlock: 4 }}>
                <Box component="fieldset" sx={{ padding: 4 }}>
                    <Typography component="legend" variant="h4">
                        Meta
                    </Typography>
                    <Controller
                        name="meta.wifi"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => {
                            return (
                                <FormControlLabel
                                    control={<Switch {...field} checked={field.value} sx={{ marginLeft: 5 }} />}
                                    label={'Wifi available'}
                                    labelPlacement="start"
                                    sx={{ width: '100%', justifyContent: 'space-between' }}
                                />
                            )
                        }}
                    />
                    <Controller
                        name="meta.parking"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => {
                            return (
                                <FormControlLabel
                                    control={<Switch {...field} checked={field.value} sx={{ marginLeft: 5 }} />}
                                    label={'Parking available'}
                                    labelPlacement="start"
                                    sx={{ width: '100%', justifyContent: 'space-between' }}
                                />
                            )
                        }}
                    />
                    <Controller
                        name="meta.breakfast"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => {
                            return (
                                <FormControlLabel
                                    control={<Switch {...field} checked={field.value} sx={{ marginLeft: 5 }} />}
                                    label={'Breakfast included'}
                                    labelPlacement="start"
                                    sx={{ width: '100%', justifyContent: 'space-between' }}
                                />
                            )
                        }}
                    />
                    <Controller
                        name="meta.pets"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => {
                            return (
                                <FormControlLabel
                                    control={<Switch {...field} checked={field.value} sx={{ marginLeft: 5 }} />}
                                    label={'Pets allowed'}
                                    labelPlacement="start"
                                    sx={{ width: '100%', justifyContent: 'space-between' }}
                                />
                            )
                        }}
                    />
                </Box>
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
            {enableDelete && (
                <>
                    <Button color="error" variant="outlined" sx={{ marginInline: 2 }} onClick={handleOpen}>
                        Delete venue
                    </Button>
                    <AlertDialog
                        action={async () => {
                            await handleDelete(id ?? '')
                        }}
                        handleClose={handleClose}
                        open={open}
                        primaryColor={'error'}
                        text={`Are you sure you want to delete this venue ${defaultValues?.name}. This action can not be undone.`}
                        title={`Delete venue ${defaultValues?.name}?`}
                    />
                </>
            )}
            <Button onClick={goBack} color="secondary">
                Cancel
            </Button>
        </Box>
    )
}
