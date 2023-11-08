import { ReactElement } from 'react'
import { Box, Link, Typography } from '@mui/material'

export default function Footer(): ReactElement {
    const year = new Date().getFullYear()

    return (
        <Box component="footer" sx={{ textAlign: 'center', backgroundColor: 'primary.dark', paddingBlock: 1 }}>
            <Typography variant="h6" color={'primary.contrastText'}>
                {`©${year} - `}
                <Link
                    href="https://joakimtveter.no"
                    sx={{
                        color: 'currentColor',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                    }}
                >
                    Joakim Tveter
                </Link>
            </Typography>
        </Box>
    )
}
