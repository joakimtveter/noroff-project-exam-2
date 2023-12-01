import { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useGetVenueByIdQuery, useUpdateVenueMutation } from '@/services/holidaze'
import VenueForm, { VenueFormSchema } from '@/components/forms/venue-form'

import { CircularProgress, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'

export default function EditVenuePage(): ReactElement {
    const { venueId } = useParams()
    if (venueId === undefined) return <p>There was an error</p>
    const { data, isError, isLoading } = useGetVenueByIdQuery(venueId)
    const [updateVenue] = useUpdateVenueMutation()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<VenueFormSchema> = async (submission): Promise<void> => {
        console.log('submitted: ', submission)
        try {
            await updateVenue({ venueId, body: submission })
            toast.success('Venue updated')
            navigate(`/venues/${venueId}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Helmet>
                <title>{`Update venue - ${data?.name} | Holidaze`}</title>
            </Helmet>
            <Typography component="h1" variant="h2">
                Update Venue
            </Typography>
            {isError ? (
                <p>There was an error</p>
            ) : isLoading ? (
                <CircularProgress />
            ) : (
                <VenueForm
                    onSubmit={onSubmit}
                    submitButtonText={'Update Venue'}
                    defaultValues={data}
                    enableDelete={true}
                    id={venueId}
                />
            )}
        </>
    )
}
