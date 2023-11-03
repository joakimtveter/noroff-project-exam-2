import type { ReactNode } from 'react';
import Container from "@mui/material/Container";

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function StandardLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <Container maxWidth="lg" component="main" id="main-content" sx={{paddingBlock: 2}}>
                {children}
            </Container>
            <Footer />
        </>
    );
}
