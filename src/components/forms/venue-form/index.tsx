import { ReactElement } from 'react'
import { Control, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

import CustomTextField from '@/components/forms/form-components/text-field'
import CustomNumberField from '@/components/forms/form-components/number-field'
import MediaFields from '@/components/forms/form-components/media'
import CustomRating from '@/components/forms/form-components/rating'
import CustomSwitch from '@/components/forms/form-components/switch'

import EuroIcon from '@mui/icons-material/Euro'
import PeopleIcon from '@mui/icons-material/People'
import AddLocationIcon from '@mui/icons-material/AddLocation'

import { FormValues } from '@/pages/venues/AddVenuePage.tsx'

interface VenueFormProps {
    onSubmit: (e: FormValues) => void
    handleSubmit: UseFormHandleSubmit<FormValues>
    control: Control<FormValues>
    register: UseFormRegister<FormValues>

    submitText: string
}

export default function VenueForm(props: VenueFormProps): ReactElement {
    const { submitText, control, handleSubmit, onSubmit, register } = props

    return (
        //
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '600px' }}>
            <CustomTextField control={control} name={'name'} label={'Name'} fullWidth={true} />
            <CustomTextField control={control} name={'description'} label={'Description'} fullWidth={true} />
            <Stack sx={{ maxWidth: '250px' }}>
                <CustomNumberField control={control} name={'price'} label={'Price per night'} icon={<EuroIcon />} />
                <CustomNumberField
                    control={control}
                    name={'maxGuests'}
                    label={'Maximum number of guest'}
                    icon={<PeopleIcon />}
                />
            </Stack>
            <MediaFields control={control} register={register} />
            <CustomRating control={control} name={'rating'} label={'Rating'} />
            <Stack sx={{ maxWidth: '400px', marginBlock: 4 }}>
                <Paper sx={{ padding: 4 }}>
                    <Typography component="legend" variant="h4">
                        Meta
                    </Typography>
                    <CustomSwitch control={control} name={'wifi'} label={'Wifi available'} />
                    <CustomSwitch control={control} name={'parking'} label={'Parking available'} />
                    <CustomSwitch control={control} name={'breakfast'} label={'Breakfast included'} />
                    <CustomSwitch control={control} name={'pets'} label={'Pets Allowed'} />
                </Paper>
            </Stack>
            <Typography component="h2" variant="h4">
                Location
            </Typography>
            <CustomTextField
                control={control}
                name={'address'}
                label={'Address'}
                fullWidth={true}
                autoComplete={'street-address'}
            />
            <CustomTextField
                control={control}
                name={'zip'}
                label={'Zip Code'}
                fullWidth={true}
                autoComplete={'postal-code'}
            />
            <CustomTextField
                control={control}
                name={'city'}
                label={'City'}
                fullWidth={true}
                autoComplete={'address-level1'}
            />
            <CustomTextField
                control={control}
                name={'country'}
                label={'Country'}
                fullWidth={true}
                autoComplete={'country-name'}
            />
            <CustomTextField
                control={control}
                name={'continent'}
                label={'Continent'}
                fullWidth={true}
                autoComplete={'on'}
            />
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
                {submitText}
            </Button>
        </Box>
    )
}
