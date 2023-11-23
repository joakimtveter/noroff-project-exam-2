import { ReactElement } from 'react'

import { Box } from '@mui/material'

import LoginForm from '@/components/forms/sign-in-form'

export default function LoginPage(): ReactElement {
    return (
        <Box>
            <LoginForm />
        </Box>
    )
}
