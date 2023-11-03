import { FormEvent, ReactElement } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import { Box, Button, Container, Link, TextField, Typography } from '@mui/material'
import Layout from '@/components/layout'

import { useLoginMutation } from '@/services/holidaze'
import { useDispatch } from 'react-redux'
import { logIn } from '@/features/user/userSlice'

import { LoginRequest } from '@/types/user.ts'

export default function LoginPage(): ReactElement {
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
            console.log('request: ', request)
            const response = await login(request)
            console.log(response)
            if ('data' in response) {
                dispatch(logIn(response.data))
            }
            navigate('/profile')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Layout>
            <Container component="main" maxWidth="xs">
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
                            {`Don't have an account? Sign Up`}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}
