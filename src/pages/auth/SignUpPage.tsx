import { ReactElement } from 'react'
import { Box } from '@mui/material'

import SignUpForm from '@/components/forms/sign-up-form'

export default function SignUpPage(): ReactElement {
    return (
        <Box>
            <SignUpForm />
        </Box>
    )
}
