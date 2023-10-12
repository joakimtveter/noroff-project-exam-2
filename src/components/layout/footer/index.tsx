import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';

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
