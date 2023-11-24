import { FormEvent, ReactElement } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useRegisterProfileMutation } from '@/services/holidaze.ts'

import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { RegisterUserObject } from '@/types/user.ts'

export default function SignUpForm(): ReactElement {
    const [registerProfile] = useRegisterProfileMutation()
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const data = new FormData(event.currentTarget)
            const request: RegisterUserObject = {
                name: data.get('name') as string,
                email: data.get('email') as string,
                password: data.get('password') as string,
            }

            const response = await registerProfile(request)
            console.log(response)
            navigate('/sign-in')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Link component={RouterLink} to="/sign-in" variant="body2">
                        I already have an account? I want to sign in
                    </Link>
                </Box>
            </Box>
        </>
    )
}
