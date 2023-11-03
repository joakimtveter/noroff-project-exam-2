import { ReactElement, SyntheticEvent } from 'react'
import { useController } from 'react-hook-form'
import { Box, Rating, Typography } from '@mui/material'

interface CustomSwitchProps {
    control: any
    name: string
    label: string
}
export default function CustomRating(props: CustomSwitchProps): ReactElement {
    const { control, name, label } = props
    const { field } = useController({ control, name })

    const handleChange = (_e: SyntheticEvent, value: number | null): void => {
        field.onChange(value)
    }

    return (
        <Box>
            <Typography component="legend">{label}</Typography>
            <Rating size={'large'} {...field} onChange={handleChange} />
        </Box>
    )
}
