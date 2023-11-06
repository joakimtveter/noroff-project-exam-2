import { ReactElement, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useGetVenueByIdQuery, useUpdateVenueMutation } from '@/services/holidaze'

import { Typography } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import VenueForm from '@/components/forms/venue-form'

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

export default function CreateVenuePage(): ReactElement {
    const { venueId } = useParams()
    if (venueId === undefined) return <p>There was an error</p>
    const { data, isError, isLoading } = useGetVenueByIdQuery(venueId)
    const [updateVenue] = useUpdateVenueMutation()
    const navigate = useNavigate()

    const initialValue = {
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

    const { control, handleSubmit, register, reset } = useForm<FormValues>({
        defaultValues: initialValue,
        // TODO: fix yup reslover types
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        resolver: yupResolver(schema),
    })

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
        await updateVenue({ venueId, body })
        navigate(`/venues/${venueId}`)
    }

    useEffect(() => {
        if (!isLoading && !isError && data != null) {
            reset(initialValue) // Initialize the form with data when it's available
        }
    }, [data, isLoading, isError, reset])

    return (
        <>
            <Typography component="h1" variant="h2">
                Update Venue
            </Typography>
            <VenueForm
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                control={control}
                register={register}
                submitText={'Update Venue'}
            />
        </>
    )
}
