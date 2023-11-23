import { FormEvent, ReactElement } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import { Box, Button, Link, TextField, Typography } from '@mui/material'

import { useLoginMutation } from '@/services/holidaze.ts'
import { useDispatch } from 'react-redux'
import { logIn } from '@/features/user/userSlice.ts'

import { LoginRequest } from '@/types/user.ts'
import { toast } from 'react-toastify'

export default function LoginForm(): ReactElement {
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const data = new FormData(event.currentTarget)
            const request: LoginRequest = {
                email: data.get('email') as string,
                password: data.get('password') as string,
            }
            const response = await login(request)
            if ('data' in response) {
                dispatch(logIn(response.data))
                navigate('/profile')
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to log in')
        }
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h4">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button>

                <Link component={RouterLink} to="/sign-up" variant="body2">
                    {`I don't have an account. I wish to join.`}
                </Link>
            </Box>
        </Box>
    )
}
