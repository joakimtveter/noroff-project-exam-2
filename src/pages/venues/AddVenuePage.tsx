import { ReactElement } from 'react'
import { useCreateVenueMutation } from '@/services/holidaze'
import { Typography } from '@mui/material'

import VenueForm, {VenueFormSchema} from '@/components/forms/venue-form'
import { useNavigate } from 'react-router-dom'

import { SubmitHandler } from 'react-hook-form'
import { Helmet } from 'react-helmet'


export default function AddVenuePage(): ReactElement {
    const [createVenue] = useCreateVenueMutation()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<VenueFormSchema> = async (data): Promise<void> => {
        console.log('submitted: ', data)
        try {
            await createVenue(data)
            navigate('/profile')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Helmet>
                <title>Add a new venue</title>
            </Helmet>
            <Typography component="h1" variant="h2">
                Add a new venue
            </Typography>
            <VenueForm
                onSubmit={onSubmit}
                submitButtonText={'Add Venue'}
            />
        </>
    )
}
