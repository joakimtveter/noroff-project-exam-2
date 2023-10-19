import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '@/themes/default';

import HomePage from '@/pages';
import AllVenuesPage from '@/pages/venues';
import VenuePage from '@/pages/venues/id';
import MyProfilePage from '@/pages/profile';
import ProfilePage from '@/pages/profile/id';
import EditProfilePage from '@/pages/profile/edit';
import LoginPage from '@/pages/sign-in';
import RegisterPage from '@/pages/sign-up';

import './global.css';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: 'venues',
        element: <AllVenuesPage />,
    },
    {
        path: 'venues/:venueId',
        element: <VenuePage />,
    },
    {
        path: 'profile',
        element: <MyProfilePage />,
    },
    {
        path: 'profile/edit',
        element: <EditProfilePage />,
    },
    {
        path: 'profile/:profileName',
        element: <ProfilePage />,
    },
    {
        path: 'sign-in',
        element: <LoginPage />,
    },
    {
        path: 'sign-up',
        element: <RegisterPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <RouterProvider router={router} />
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
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
