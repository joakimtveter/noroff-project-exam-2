import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import 'react-toastify/dist/ReactToastify.css';

export default function StandardLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <ToastContainer />
            <Footer />
        </>
    );
}
