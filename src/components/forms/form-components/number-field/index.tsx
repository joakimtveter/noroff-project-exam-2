import { ReactElement } from 'react'
import { useController } from 'react-hook-form'
import { InputAdornment, TextField } from '@mui/material'

interface CustomNumberFieldProps {
    control: any
    name: string
    label: string
    fullWidth?: boolean
    helperText?: string
    icon?: ReactElement
    position?: boolean
}
export default function CustomNumberField(props: CustomNumberFieldProps): ReactElement {
    const { name, control, label, fullWidth, icon, helperText, position = false } = props
    const { field, fieldState } = useController({ control, name })
    const { error } = fieldState
    const pattern: string = position ? '^[\\-]{0,1}[0-9]*\\.[0-9]*$' : '[0-9].*'
    return (
        <TextField
            label={label}
            variant={'outlined'}
            fullWidth={fullWidth}
            error={error?.message != null}
            helperText={error?.message ?? helperText}
            margin={'normal'}
            inputProps={{ inputMode: 'numeric', pattern, style: { textAlign: 'end' } }}
            InputProps={{
                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
            }}
            {...field}
        />
    )
}
