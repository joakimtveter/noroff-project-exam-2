import { useFieldArray } from 'react-hook-form'
import { Button, TextField } from '@mui/material'

import { ReactElement } from 'react'

interface MediaFieldsProps {
    control: any
    register: any
}

export default function MediaFields(props: MediaFieldsProps): ReactElement {
    const { control, register } = props
    const { fields, append } = useFieldArray({ name: 'media', control })

    return (
        <>
            {fields.map((field, index: number) => (
                <TextField
                    key={field.id}
                    label={`Image ${index + 1}`}
                    variant={'outlined'}
                    fullWidth={true}
                    // error={((error?.message) != null)}
                    // helperText={(error?.message) ?? helperText}
                    margin={'normal'}
                    {...register(`media.${index}` as const)}
                />
            ))}
            <Button
                type="button"
                onClick={() => {
                    append('')
                }}
            >
                Add Field
            </Button>
        </>
    )
}
