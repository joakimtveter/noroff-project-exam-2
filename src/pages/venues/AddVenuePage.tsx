import { ReactElement } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCreateVenueMutation } from '@/services/holidaze'
import { Typography } from '@mui/material'

import Layout from '@/components/layout'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import VenueForm from '@/components/forms/venue-form'
import { useNavigate } from 'react-router-dom'

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

export default function AddVenuePage(): ReactElement {
    const [createVenue] = useCreateVenueMutation()

    const { control, handleSubmit, register } = useForm<FormValues>({
        defaultValues,
        // TODO:  fix types in yup resolver
        // @ts-expect-error sds
        resolver: yupResolver(schema),
    })
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormValues> = async (data): Promise<void> => {
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
        try {
            const response = await createVenue(body).unwrap()
            if (response.id != null) {
                navigate('/profile')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Layout>
            <Typography component="h1" variant="h2">
                Add a new venue
            </Typography>
            <VenueForm
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                control={control}
                register={register}
                submitText={'Add Venue'}
            />
        </Layout>
    )
}
