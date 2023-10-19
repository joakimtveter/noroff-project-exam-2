import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/features/user/userSlice';
import { RootState } from '@/store';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function ProfileMenu() {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const user = useSelector((state: RootState) => state.user.user);
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
                <Button component={Link} to={'/sign-in'} variant='contained' color='secondary'>
                    Sign in
                </Button>
            )}
        </Box>
    );
}
