import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <Box>
            <Typography>
                {`©${year} - `}
                <Link href='https://joakimtveter.no'>Joakim Tveter</Link>
            </Typography>
        </Box>
    );
}
