import { ReactElement } from 'react'
import { useController } from 'react-hook-form'
import { TextField } from '@mui/material'

interface CustomTextFieldProps {
    control: any
    name: any
    label: string
    fullWidth: boolean
    helperText?: string
    autoComplete?: string
}
export default function CustomTextField(props: CustomTextFieldProps): ReactElement {
    const { control, name, label, fullWidth = true, helperText = '', autoComplete = 'on' } = props
    const {
        field,
        fieldState: { error },
    } = useController({ control, name })
    return (
        <TextField
            label={label}
            variant={'outlined'}
            fullWidth={fullWidth}
            error={error?.message != null}
            helperText={error?.message ?? helperText}
            autoComplete={autoComplete}
            margin={'normal'}
            {...field}
        />
    )
}
