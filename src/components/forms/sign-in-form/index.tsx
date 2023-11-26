import { ReactElement } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useLoginMutation } from '@/services/holidaze.ts'
import { useDispatch } from 'react-redux'
import { logIn } from '@/features/user/userSlice.ts'

import { z } from "zod";
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box, Button, Link, TextField, Typography } from '@mui/material'

const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({message: "Must be a valid email" }),
    password: z.string().min(8, { message: "Password is not valid format" }),
})

type SigninFormSchema = z.infer<typeof schema>;

export default function LoginForm(): ReactElement {
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<SigninFormSchema>({ resolver: zodResolver(schema) });
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<SigninFormSchema> = async (data): Promise<void> => {
        try {
            const response = await login(data)
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
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    id="email"
                    label="Email Address"
                    autoComplete="username"
                    autoFocus
                    {...register("email")}
                    helperText={errors.email?.message}
                    error={!!errors.email}
                    fullWidth
                    required
                />
                <TextField
                    margin="normal"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password")}
                    helperText={errors.password?.message}
                    error={!!errors.password}
                    fullWidth
                    required
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button>

                <Link component={RouterLink} to="/sign-up" variant="body2">
                     I don't have an account. I wish to join.
                </Link>
            </Box>
        </Box>
    )
}
