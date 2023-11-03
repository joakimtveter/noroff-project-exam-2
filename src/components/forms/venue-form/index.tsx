import { type FormEvent, type MutableRefObject, type ReactElement, useState } from 'react'
import { Box, Button, FormControlLabel, InputAdornment, Rating, Stack, Switch, TextField, Typography } from '@mui/material'

import EuroSymbolIcon from '@mui/icons-material/EuroSymbol'
import PeopleIcon from '@mui/icons-material/People'

import { type VenueFormTypes } from '@/types/venue.ts'

interface VenueFormProps {
  formRef: MutableRefObject<HTMLFormElement | null>
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  defaultValues: VenueFormTypes
}

export default function VenueForm (props: VenueFormProps): ReactElement {
  const { onSubmit, defaultValues, formRef } = props
  const [imageFields, setImageFields] = useState<string[]>(['image'])
  const addField = (): void => {
    setImageFields(
      [...imageFields, `image${imageFields.length}`]
    )
  }

  return (
        <Stack ref={formRef} gap={2} component={'form'} onSubmit={onSubmit} sx={{ maxWidth: '500px' }} >
            <TextField
                name='name'
                label='Name'
                defaultValue={defaultValues.name}
                variant="outlined"
                fullWidth={true}
                error={false}
                helperText={''}
            />
            <TextField
                name='description'
                label='Description'
                defaultValue={defaultValues.description}
                variant="outlined"
                fullWidth={true}
                error={false}
                helperText={''}
            />
            <Stack direction='row'>
                <TextField
                    name='price'
                    label='Price per night'
                    defaultValue={defaultValues.price}
                    variant="outlined"
                    fullWidth={false}
                    error={false}
                    helperText={''}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'end' } }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><EuroSymbolIcon /></InputAdornment>
                    }}
                />
                <TextField
                    name='maxGuests'
                    label='Maximum number of Guests'
                    defaultValue={defaultValues.maxGuests}
                    variant="outlined"
                    fullWidth={false}
                    error={false}
                    helperText={''}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'end' } }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>
                    }}
                />
            </Stack>
                <Typography variant='h4'>Images</Typography>
            { imageFields.map((field) => (

                <TextField
                    key={field}
                    name='image'
                    label='Image'
                    defaultValue={defaultValues.name}
                    variant="outlined"
                    fullWidth={true}
                    error={false}
                    helperText={''}
                />
            ))

            }
<Button type='button' onClick={addField}>add</Button>
            <Box>
                <Typography component="legend">Rating</Typography>
                <Rating
                    name={'rating'}
                    precision={0.5}
                    size="large"
                    defaultValue={defaultValues.rating}
                />
            </Box>

            <Typography variant='h4'>Amenities</Typography>
            <FormControlLabel
                name='wifi'
                control={<Switch />}
                label='Wifi available'
                labelPlacement={'start'}
            />
            <FormControlLabel
                name='parking'
                label='Parking on property'
                labelPlacement={'start'}
                control={<Switch />}
            />
            <FormControlLabel
                name='breakfast'
                label='Breakfast included'
                labelPlacement={'start'}
                control={<Switch />}
            />
            <FormControlLabel
                name='pets'
                label='Pets allowed'
                labelPlacement={'start'}
                control={<Switch />}
            />

            <Typography variant='h4'>Location</Typography>
            <TextField
                name='address'
                label='Address'
                variant="outlined"
                fullWidth={true}
                error={false}
                helperText={''}
            />
            <TextField
                name='city'
                label='City'
                variant="outlined"
                fullWidth={true}
                error={false}
                helperText={''}
            />

            <TextField
                name='zip'
                label='Zip Code'
                variant="outlined"
                fullWidth={true}
                error={false}
                helperText={''}
            />
            <TextField
                name='country'
                label='Country'
                variant="outlined"
                fullWidth={true}
                error={false}
                helperText={''}
            />

            <TextField
                name='continent'
                label='Continent'
                variant="outlined"
                fullWidth={true}
                error={false}
                helperText={''}
            />
            <TextField
                name='lat'
                label='Latitude'
                defaultValue={defaultValues.price}
                variant="outlined"
                fullWidth={false}
                error={false}
                helperText={''}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'end' } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EuroSymbolIcon /></InputAdornment>
                }}
            />
            <TextField
                name='lng'
                label='Longitude'
                defaultValue={defaultValues.price}
                variant="outlined"
                fullWidth={false}
                error={false}
                helperText={''}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'end' } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EuroSymbolIcon /></InputAdornment>
                }}
            />

            <Button component='button' type='submit' variant="contained">Create Venue</Button>
        </Stack>
  )
}
