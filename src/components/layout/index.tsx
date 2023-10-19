import { ReactNode } from 'react';
import Box from '@mui/material/Box';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function StandardLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <Box component='main' id='main-content'>
                {children}
            </Box>
            <Footer />
        </>
    );
}
