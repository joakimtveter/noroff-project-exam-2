import { ReactElement } from 'react'
import { useController } from 'react-hook-form'
import { FormControlLabel, Switch } from '@mui/material'

interface CustomSwitchProps {
    control: any
    name: string
    label: string
}
export default function CustomSwitch(props: CustomSwitchProps): ReactElement {
    const { control, name, label } = props
    const { field } = useController({ control, name })

    return (
        <FormControlLabel
            control={<Switch checked={field.value} sx={{ marginLeft: 5 }} />}
            label={label}
            labelPlacement="start"
            sx={{ width: '100%', justifyContent: 'space-between' }}
            {...field}
        />
    )
}
