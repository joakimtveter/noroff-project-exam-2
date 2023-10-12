import { FormEvent } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useLoginMutation } from '@/services/holidaze';
import { useDispatch } from 'react-redux';
import { logIn } from '@/features/user/userSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Layout from '@/components/layout';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function LoginPage() {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const request = { email: data.get('email'), password: data.get('password') };
            console.log('request: ', request);
            const response = await login(request);
            console.log(response);
            if ('data' in response && response.data) {
                dispatch(logIn(response.data));
            }
            navigate('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <Container component='main' maxWidth='xs'>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component='h1' variant='h4'>
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>

                        <Link component={RouterLink} to='/sign-up' variant='body2'>
                            {`Don't have an account? Sign Up`}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}
