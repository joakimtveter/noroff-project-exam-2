import { ReactElement } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useRegisterProfileMutation } from '@/services/holidaze.ts'

import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { z } from "zod";
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const namePattern = /^[\w]+$/;
const schema = z.object({
name: z.string().min(1, { message: "Name is required" })
    .max(20, { message: "Name can't be longer than 20 characters" })
    .refine((value) => namePattern.test(value), {message: 'Name can only contain letters, numbers, and undercores (_)'}),
email: z.string().min(1, { message: "Email is required" }).email({message: "Must be a valid email" }),
password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
})

type RegisterFormSchema = z.infer<typeof schema>;

export default function SignUpForm(): ReactElement {
    const [registerProfile] = useRegisterProfileMutation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormSchema>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<RegisterFormSchema> = async (data): Promise<void> => {
        try {
            const response = await registerProfile(data)
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
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                {...register("name")}
                                helperText={errors.name?.message}
                                error={!!errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                {...register("email")}
                                helperText={errors.email?.message}
                                error={!!errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                {...register("password")}
                                helperText={errors.password?.message}
                                error={!!errors.password}
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
