import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import 'react-toastify/dist/ReactToastify.css';

export default function StandardLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <Box component='main' id='main-content'>
                {children}
            </Box>
            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
            <Footer />
        </>
    );
}
