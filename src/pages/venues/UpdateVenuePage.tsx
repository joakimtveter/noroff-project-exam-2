import { ReactElement, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useUpdateVenueMutation, useGetVenueByIdQuery } from '@/services/holidaze'

import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import EuroIcon from '@mui/icons-material/Euro'
import AddLocationIcon from '@mui/icons-material/AddLocation'

import Layout from '@/components/layout'
import CustomTextField from '@/components/forms/form-components/text-field'
import CustomNumberField from '@/components/forms/form-components/number-field'
import CustomSwitch from '@/components/forms/form-components/switch'
import CustomRating from '@/components/forms/form-components/rating'
import MediaFields from '@/components/forms/form-components/media'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
    .object()
    .shape({
        name: yup.string().required(),
        description: yup.string().required().min(10),
        price: yup.number().required().positive(),
        media: yup.array().of(yup.string()),
        maxGuests: yup.number().required().positive().min(1).max(100),
        rating: yup.number().required().positive().min(0).max(5),
        wifi: yup.boolean().required(),
        parking: yup.boolean().required(),
        breakfast: yup.boolean().required(),
        pets: yup.boolean().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        zip: yup.string().required(),
        country: yup.string().required(),
        continent: yup.string().required(),
        lat: yup.number().required(),
        lng: yup.number().required(),
    })
    .defined()

export interface FormValues {
    name: string
    description: string
    media: string[]
    price: number
    maxGuests: number
    rating: number
    wifi: boolean
    parking: boolean
    breakfast: boolean
    pets: boolean
    address: string
    city: string
    zip: string
    country: string
    continent: string
    lat: number
    lng: number
}

const defaultValues = {
    name: '',
    description: '',
    media: [],
    price: 0,
    maxGuests: 1,
    rating: 2,
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    address: '',
    city: '',
    zip: '',
    country: '',
    continent: '',
    lat: 0,
    lng: 0,
}

export default function CreateVenuePage(): ReactElement {
    const { venueId } = useParams()
    // const [updateVenue] = useUpdateVenueMutation()

    const fetchValues = async (): Promise<FormValues> => {
        try {
            if (venueId === undefined) return defaultValues
            const { data, error } = useGetVenueByIdQuery(venueId)
            if (error != null) throw new Error(`Fetch error`)
            console.log('formData: ', data)
            return {
                name: data?.name ?? '',
                description: data?.description ?? '',
                media: data?.media ?? [],
                price: data?.price ?? 0,
                maxGuests: data?.maxGuests ?? 1,
                rating: data?.rating ?? 0,
                wifi: data?.meta.wifi ?? false,
                parking: data?.meta.parking ?? false,
                breakfast: data?.meta.breakfast ?? false,
                pets: data?.meta.pets ?? false,
                address: data?.location.address ?? '',
                city: data?.location.city ?? '',
                zip: data?.location.zip ?? '',
                country: data?.location.country ?? '',
                continent: data?.location.continent ?? '',
                lat: data?.location.lat ?? 0,
                lng: data?.location.lng ?? 0,
            }
        } catch (error) {
            console.error(error)
            return defaultValues
        }
    }
    const { control, handleSubmit, register } = useForm<FormValues>({
        defaultValues: async () => await fetchValues(),
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<FormValues> = (data): void => {
        const body = {
            name: data.name,
            description: data.description,
            media: data.media,
            price: data.price,
            maxGuests: data.maxGuests,
            rating: data.rating,
            meta: {
                wifi: data.wifi,
                parking: data.parking,
                breakfast: data.breakfast,
                pets: data.pets,
            },
            location: {
                address: data.address,
                city: data.city,
                zip: data.zip,
                country: data.country,
                continent: data.continent,
                lat: data.lat,
                lng: data.lng,
            },
        }
        console.log('submitted: ', body)
        // updateVenue(body)
    }

    return (
        <Layout>
            <Typography component="h1" variant="h2">
                Update Venue
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '600px' }}>
                <CustomTextField control={control} name={'name'} label={'Name'} fullWidth={true} />
                <CustomTextField control={control} name={'description'} label={'Description'} fullWidth={true} />
                <CustomNumberField control={control} name={'price'} label={'Price per night'} icon={<EuroIcon />} />
                <CustomNumberField
                    control={control}
                    name={'maxGuests'}
                    label={'Maximum number of guest'}
                    icon={<PeopleIcon />}
                />
                <MediaFields control={control} register={register} />
                <CustomRating control={control} name={'rating'} label={'Rating'} />
                <Stack component="fieldset" sx={{ maxWidth: '300px', marginBlock: 4 }}>
                    <Typography component="legend" variant="h4">
                        Meta
                    </Typography>
                    <CustomSwitch control={control} name={'wifi'} label={'Wifi available'} />
                    <CustomSwitch control={control} name={'parking'} label={'Parking available'} />
                    <CustomSwitch control={control} name={'breakfast'} label={'Breakfast included'} />
                    <CustomSwitch control={control} name={'pets'} label={'Pets Allowed'} />
                </Stack>
                <Typography component="h2" variant="h4">
                    Location
                </Typography>
                <CustomTextField control={control} name={'address'} label={'Address'} fullWidth={true} />
                <CustomTextField control={control} name={'zip'} label={'Zip Code'} fullWidth={true} />
                <CustomTextField control={control} name={'city'} label={'City'} fullWidth={true} />
                <CustomTextField control={control} name={'country'} label={'Country'} fullWidth={true} />
                <CustomTextField control={control} name={'continent'} label={'Continent'} fullWidth={true} />
                <CustomNumberField
                    control={control}
                    name={'lat'}
                    label={'Latitude'}
                    fullWidth={true}
                    position={true}
                    icon={<AddLocationIcon />}
                />
                <CustomNumberField
                    control={control}
                    name={'lng'}
                    label={'Longitude'}
                    fullWidth={true}
                    position={true}
                    icon={<AddLocationIcon />}
                />

                <Button type="submit" variant="contained" sx={{ marginBlock: 3 }}>
                    Update Venue
                </Button>
            </Box>
        </Layout>
    )
}
