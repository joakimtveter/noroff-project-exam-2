import { ReactElement } from 'react'
import { useFieldArray } from 'react-hook-form'
import { Box, Button, Stack, IconButton, TextField } from '@mui/material'

import ClearIcon from '@mui/icons-material/Clear'

interface MediaFieldsProps {
    control: any
    register: any
}

export default function MediaFields(props: MediaFieldsProps): ReactElement {
    const { control, register } = props
    const { fields, append, remove } = useFieldArray({ name: 'media', control })

    return (
        <Box sx={{ marginBlock: 2 }}>
            {fields.map((field, index: number) => (
                <Stack key={field.id} direction="row">
                    <TextField
                        key={field.id}
                        label={`Image ${index + 1}`}
                        type="url"
                        variant={'outlined'}
                        fullWidth={true}
                        // error={((error?.message) != null)}
                        // helperText={(error?.message) ?? helperText}
                        margin={'normal'}
                        {...register(`media.${index}` as const)}
                    />
                    <IconButton
                        onClick={(): void => {
                            remove(index)
                        }}
                    >
                        <ClearIcon color="error" />
                    </IconButton>
                </Stack>
            ))}
            <Button
                variant="outlined"
                type="button"
                onClick={() => {
                    append('')
                }}
            >
                Add Image
            </Button>
        </Box>
    )
}
