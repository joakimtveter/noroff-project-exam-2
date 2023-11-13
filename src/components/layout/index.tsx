import { ReactElement } from 'react'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function Layout(): ReactElement {
    return (
        <Box sx={{ display: 'grid', gridTemplateRows: '64px 1fr 48px' }}>
            <Header />
            <Container maxWidth="lg" component="main" id="main-content" sx={{ paddingBlock: 2, height: '100%' }}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    )
}
