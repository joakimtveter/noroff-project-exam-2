import { ReactElement, MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton } from '@mui/material'

import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { Route } from '@/types/layout.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store.ts'
import { logOut } from '@/features/user/userSlice.ts'
import LoginIcon from '@mui/icons-material/Login'

interface HamburgerMenuProps {
    routes: Route[]
}

export default function HamburgerMenu(props: HamburgerMenuProps): ReactElement {
    const { routes } = props
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const user = useSelector((state: RootState) => state.user.user)
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorElement)
    const handleClick = (event: MouseEvent<HTMLElement>): void => {
        setAnchorElement(event.currentTarget)
    }
    const handleClose = (): void => {
        setAnchorElement(null)
    }
    const handleLogout = (): void => {
        setAnchorElement(null)
        dispatch(logOut())
    }
    return (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <MenuIcon fontSize="large" color="primary" />
            </IconButton>
            <Menu
                anchorEl={anchorElement}
                id="mobile-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {routes.map((route) => (
                    <MenuItem key={route.label} component={Link} to={route.href} onClick={handleClose}>
                        {route.label}
                    </MenuItem>
                ))}
                <Divider />
                {isLoggedIn ? (
                    <>
                        <MenuItem component={Link} to={'/profile'} onClick={handleClose}>
                            <Avatar src={user.avatar} /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" color="primary" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem component={Link} to={'/sign-in'} onClick={handleClose}>
                        <ListItemIcon>
                            <LoginIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        Sign in
                    </MenuItem>
                )}
            </Menu>
        </Box>
    )
}
