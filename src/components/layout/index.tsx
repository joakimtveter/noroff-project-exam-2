import { ReactElement } from 'react'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function Layout(): ReactElement {
    return (
        <>
            <Header />
            <Container maxWidth="lg" component="main" id="main-content" sx={{ paddingBlock: 2 }}>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}
