import { ReactElement } from 'react'
import { Box, Grid, Paper } from '@mui/material'
import image from '@/assets/juan-burgos-_m3nD5aQIDo-unsplash.webp'

import LoginForm from '@/components/forms/sign-in-form'

export default function LoginPage(): ReactElement {
    return (
        <Box sx={{display: 'grid', placeItems: 'center', padding: 2, height: '100%'}}>
            <Paper component='section' elevation={2} sx={{marginBlock: 4}}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box component='figure' sx={{aspectRatio: '1 / 1', }}>
                            <img 
                                src={image} 
                                alt='A nice white beach with two sunbeds and palmtrees. The skye is blue, and the water is nice and clear' 
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
