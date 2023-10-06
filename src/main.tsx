import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { persistor, store } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import HomePage from '@/pages/homePage';
import AllVenuesPage from '@/pages/allVenuesPage';
import VenuePage from '@/pages/venuePage';
import ProfilePage from '@/pages/profilePage';
import LoginPage from '@/pages/loginPage';
import RegisterPage from '@/pages/registerPage';

import './global.css';

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
        element: <ProfilePage />,
    },
    {
        path: 'profile/:profileName',
        element: <ProfilePage />,
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'register',
        element: <RegisterPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
