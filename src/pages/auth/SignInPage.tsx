import { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Grid, Paper } from '@mui/material'

import LoginForm from '@/components/forms/sign-in-form'
import image from '@/assets/juan-burgos-_m3nD5aQIDo-unsplash.webp'

export default function LoginPage(): ReactElement {
    return (
        <Box sx={{display: 'grid', placeItems: 'center', padding: 2, height: '100%'}}>
            <Helmet>
                <title>Sign in | Holidaze</title>
            </Helmet>
            <Paper component='section' elevation={2} sx={{marginBlock: 4}}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box component='figure' sx={{aspectRatio: '1 / 1', }}>
                            <img 
                                src={image} 
                                alt='A beautifull morning in the mountains. The moon is still in the sky while the lower part of the sky is turning yellow. A pool and palmtrees are in the forground and a town is down in a vally in the background.' 
                                style={{objectFit: 'cover', height: '100%', width: '100%'}} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} padding={4}>
                        <LoginForm />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}
