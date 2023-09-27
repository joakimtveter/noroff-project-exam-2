import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from '@/store';
import { Provider } from 'react-redux';

import HomePage from '@/pages/homePage';
import AllVenuesPage from '@/pages/allVenuesPage';
import VenuePage from '@/pages/venuePage';
import ProfilePage from '@/pages/profilePage';

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
