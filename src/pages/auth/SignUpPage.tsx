import { ReactElement } from 'react'
import { Box, Grid, Paper } from '@mui/material'

import image from '@/assets/mohamed-thasneem-3bAblStd-IY-unsplash.webp'

import SignUpForm from '@/components/forms/sign-up-form'

export default function SignUpPage(): ReactElement {
    return (
        <Box sx={{display: 'grid', placeItems: 'center', padding: 2, height: '100%'}}>
            <Paper component='section' elevation={2}>
                <Grid container>
                    <Grid item xs={12} md={6} order={{xs: 2, md: 1}}>
                        <Box component='figure' sx={{aspectRatio: '1 / 1', }}>
                            <img 
                                src={image} 
                                alt='A nice white beach with two sunbeds and palmtrees. The skye is blue, and the water is nice and clear' 
                                style={{objectFit: 'cover', height: '100%', width: '100%'}} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} padding={4} order={{xs: 1, md: 2}}>
                        <SignUpForm />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}
