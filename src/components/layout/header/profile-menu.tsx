import { useState, MouseEvent, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '@/features/user/userSlice'
import { RootState } from '@/store'

import { Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import Logout from '@mui/icons-material/Logout'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

export default function ProfileMenu(): ReactElement {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const user = useSelector((state: RootState) => state.user.user)
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
        setAnchorElement(event.currentTarget)
    }

    const handleLogout = (): void => {
        setAnchorElement(null)
        dispatch(logOut())
    }

    const handleCloseUserMenu = (): void => {
        setAnchorElement(null)
    }
    return (
        <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
                <>
                    <Tooltip title="Profile settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt={user.name.toUpperCase()}
                                src={user.avatar !== '' ? user.avatar : 'this string ensures a letter'}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElement}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElement)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem component={Link} to={'/profile'} onClick={handleCloseUserMenu}>
                            <ListItemIcon>
                                <AccountBoxIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" color="primary" />
                            </ListItemIcon>
                            Log out
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Button component={Link} to={'/sign-in'} variant="contained" color="primary" endIcon={<LoginIcon />}>
                    Sign in
                </Button>
            )}
        </Box>
    )
}
