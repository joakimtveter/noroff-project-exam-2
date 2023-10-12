import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

export default function ProfileMenu() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogout = () => {
        setAnchorElUser(null);
        alert('Logout');
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                <MenuItem component={Link} to={'/profile'} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Typography textAlign='center'>Log out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
