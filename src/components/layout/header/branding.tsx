import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'

export default function Branding(): ReactElement {
    return (
        <Stack direction="row" component={NavLink} to="/" gap={1} alignItems="center" sx={{ textDecoration: 'none' }}>
            <HolidayVillageIcon color="primary" fontSize="large" />
            <Typography
                variant="h5"
                component="span"
                noWrap
                sx={{
                    letterSpacing: '.2rem',
                    textDecoration: 'none',
                    color: 'primary.dark',
                    fontSize: { xs: '20px', md: '24px' },
                }}
            >
                Holidaze
            </Typography>
        </Stack>
    )
}
