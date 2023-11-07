import { ReactElement } from 'react'
import { Box, Link } from '@mui/material'

export default function Footer(): ReactElement {
    const year = new Date().getFullYear()

    return (
        <Box component="footer" sx={{ textAlign: 'center', backgroundColor: 'primary.main', paddingBlock: 1 }}>
            <Link
                href="https://joakimtveter.no"
                sx={{
                    color: 'primary.contrastText',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                }}
            >
                {`©${year} - Joakim Tveter`}
            </Link>
        </Box>
    )
}
