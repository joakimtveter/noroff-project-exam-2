import { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Grid, Paper } from '@mui/material'

import SignUpForm from '@/components/forms/sign-up-form'
import image from '@/assets/mohamed-thasneem-3bAblStd-IY-unsplash.webp'

export default function SignUpPage(): ReactElement {
    return (
        <Box sx={{display: 'grid', placeItems: 'center', padding: 2, height: '100%'}}>
            <Helmet>
                <title>Sign up | Holidaze</title>
            </Helmet>
            <Paper component='section' elevation={2}>
                <Grid container>
                    <Grid item xs={12} md={6} order={{xs: 2, md: 1}}>
                        <Box component='figure' sx={{aspectRatio: '1 / 1', }}>
                            <img 
                                src={image} 
                                alt='A beautiful sunset over a pool. The puffy clouds and palmtrees reflect perfectly in the still water. A row of bungalows and the ocean are visible in the background.' 
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
