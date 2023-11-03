import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <Box component='footer' sx={{textAlign: 'center'}} >
            <Link href='https://joakimtveter.no' sx={{textDecoration: 'none', '&:hover':{textDecoration: 'underline'}}}>
                {`©${year} - Joakim Tveter`}
            </Link>
        </Box>
    );
}
