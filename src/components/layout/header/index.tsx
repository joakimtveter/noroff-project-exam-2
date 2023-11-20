import { ReactElement } from 'react'
import { AppBar, Toolbar, Container, Stack } from '@mui/material'

import Branding from '@/components/layout/header/branding.tsx'
import Navigation from '@/components/layout/header/navigation.tsx'
import ProfileMenu from '@/components/layout/header/profile-menu'

import { Route } from '@/types/layout.ts'
import HamburgerMenu from '@/components/layout/header/hamburger-menu.tsx'

export default function CustomAppBar(): ReactElement {
    const routes: Route[] = [{ label: 'All venues', href: '/venues' }]

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'background.paper' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Branding />
                    <Stack direction="row" alignItems="center" gap={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <Navigation routes={routes} />
                        <ProfileMenu />
                    </Stack>
                    <HamburgerMenu routes={routes} />
                </Toolbar>
            </Container>
        </AppBar>
    )
}
