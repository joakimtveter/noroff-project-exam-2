import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Button, Stack } from '@mui/material'

import { Route } from '@/types/layout.ts'

interface NavigationProps {
    routes: Route[]
}
export default function Navigation(props: NavigationProps): ReactElement {
    const { routes } = props
    return (
        <Stack component="ul">
            {routes.map((route) => (
                <Box key={route.label} component={'li'}>
                    <Button component={NavLink} to={route.href} sx={{ display: 'block' }}>
                        {route.label}
                    </Button>
                </Box>
            ))}
        </Stack>
    )
}
