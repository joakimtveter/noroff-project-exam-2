import { useForm } from 'react-hook-form'

import { Box, Button, Stack, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import EuroIcon from '@mui/icons-material/Euro'
import AddLocationIcon from '@mui/icons-material/AddLocation'

import Layout from '@/components/layout'
import CustomTextField from '@/components/forms/text-field'
import CustomNumberField from '@/components/forms/number-field'
import CustomSwitch from '@/components/forms/switch'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import type { ReactElement } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import CustomRating from '@/components/forms/rating'
import MediaFields from '@/components/forms/media'

const schema = yup.object({
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
  lng: yup.number().required()
}).required()

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
  lng: 0
}

const onSubmit: SubmitHandler<FormValues> = (data): void => {
  console.info(data)
}

export default function CreateVenuePage (): ReactElement {
  const {
    control,
    handleSubmit,
    register, formState
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  console.error('!!> ', formState.errors)
  return (
        <Layout>
          <Typography component='h1' variant='h2'>Create Venue</Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '600px' }}>
            <CustomTextField control={control} name={'name'} label={'Name'} fullWidth={true} />
            <CustomTextField control={control} name={'description'} label={'Description'} fullWidth={true} />
            <CustomNumberField control={control} name={'price'} label={'Price per night'} icon={<EuroIcon />} />
            <CustomNumberField control={control} name={'maxGuests'} label={'Maximum number of guest'} icon={<PeopleIcon />} />
            <MediaFields control={control} register={register} />
            <CustomRating control={control} name={'rating'} label={'Rating'} />
            <Stack sx={{ maxWidth: '300px', marginBlock: 4 }} >
              <Typography component='h2' variant='h4'>Meta</Typography>
              <CustomSwitch control={control} name={'wifi'} label={ 'Wifi available'} />
              <CustomSwitch control={control} name={'parking'} label={ 'Parking available'} />
              <CustomSwitch control={control} name={'breakfast'} label={ 'Breakfast included'} />
              <CustomSwitch control={control} name={'pets'} label={ 'Pets Allowed'} />
            </Stack>
              <Typography component='h2' variant='h4'>Location</Typography>
            <CustomTextField control={control} name={'address'} label={'Address'} fullWidth={true} />
            <CustomTextField control={control} name={'zip'} label={'Zip Code'} fullWidth={true} />
            <CustomTextField control={control} name={'city'} label={'City'} fullWidth={true} />
            <CustomTextField control={control} name={'country'} label={'Country'} fullWidth={true} />
            <CustomTextField control={control} name={'continent'} label={'Continent'} fullWidth={true} />
            <CustomNumberField control={control} name={'lat'} label={'Latitude'} fullWidth={true} position={true} icon={<AddLocationIcon />} />
            <CustomNumberField control={control} name={'lng'} label={'Longitude'} fullWidth={true} position={true} icon={<AddLocationIcon />} />

            <Button type='submit' variant='contained' sx={{ marginBlock: 3 }}>Create Venue</Button>
          </Box>
        </Layout>
  )
}
