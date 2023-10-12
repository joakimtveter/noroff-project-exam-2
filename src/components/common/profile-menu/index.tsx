import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/features/user/userSlice';
import { RootState } from '@/store';

import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

export default function ProfileMenu() {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const user = useSelector((state: RootState) => state.user.user);
    console.log('user: ', user);
    console.log('isLoggedIn: ', isLoggedIn);
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const handleLogout = () => {
        setAnchorElement(null);
        dispatch(logOut());
    };

    const handleCloseUserMenu = () => {
        setAnchorElement(null);
    };
    return (
        <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
                <>
                    <Tooltip title='Profile settings'>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt={user.name.toUpperCase()}
                                src={user.avatar !== '' ? user.avatar : 'this string ensures a letter'}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id='menu-appbar'
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
                        onClose={handleCloseUserMenu}>
                        <MenuItem component={Link} to={'/profile'} onClick={handleCloseUserMenu}>
                            <Typography textAlign='center'>Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign='center'>Log out</Typography>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Button component={Link} to={'/login'} variant='contained' color='secondary'>
                    Sign in
                </Button>
            )}
        </Box>
    );
}
