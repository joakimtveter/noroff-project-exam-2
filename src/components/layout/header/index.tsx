import { useState, MouseEvent, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Stack } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import ProfileMenu from './profile-menu'

export default function CustomAppBar(): ReactElement {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>): void => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null)
    }

    // const nav = {}

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'background.paper' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Stack
                        direction="row"
                        component={NavLink}
                        to="/"
                        gap={1}
                        alignItems="center"
                        sx={{ display: { xs: 'none', md: 'flex' }, textDecoration: 'none' }}
                    >
                        <HolidayVillageIcon color="primary" fontSize="large" />
                        <Typography
                            variant="h5"
                            component="span"
                            noWrap
                            sx={{
                                letterSpacing: '.2rem',
                                textDecoration: 'none',
                                color: 'primary.dark',
                            }}
                        >
                            Holidaze
                        </Typography>
                    </Stack>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        ></Menu>
                    </Box>
                    <HolidayVillageIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button component={NavLink} to={'/venues'} sx={{ display: 'block' }}>
                            All Venues
                        </Button>
                    </Box>
                    <ProfileMenu />
                </Toolbar>
            </Container>
        </AppBar>
    )
}
