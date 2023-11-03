import { useState, MouseEvent, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button } from '@mui/material'

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

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <HolidayVillageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        Holidaze
                    </Typography>

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
                        <Button
                            component={Link}
                            to={'/venues'}
                            onClick={handleCloseNavMenu}
                            sx={{ color: 'white', display: 'block' }}
                        >
                            All Venues
                        </Button>
                    </Box>
                    <ProfileMenu />
                </Toolbar>
            </Container>
        </AppBar>
    )
}
