import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from '@/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@mui/material/styles'
import defaultTheme from '@/themes/default'

import Layout from '@/components/layout'

// Pages components
import HomePage from '@/pages'
import AllVenuesPage from '@/pages/venues/AllVenuesPage'
import VenuePage from '@/pages/venues/SingleVenuePage'
import MyProfilePage from '@/pages/profile/MyProfilePage'
import ProfilePage from '@/pages/profile/ProfilePage'
import LoginPage from '@/pages/auth/SignInPage'
import RegisterPage from '@/pages/auth/SignUpPage'
import VenueAdminPage from './pages/profile/VenueAdminPage'
import AddVenuePage from '@/pages/venues/AddVenuePage'
import UpdateVenuePage from '@/pages/venues/UpdateVenuePage'

import './global.css'
import 'react-toastify/dist/ReactToastify.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
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
                path: 'venues/edit/:venueId',
                element: <UpdateVenuePage />,
            },
            {
                path: 'venues/admin/:venueId',
                element: <VenueAdminPage />,
            },
            {
                path: 'venues/add',
                element: <AddVenuePage />,
            },
            {
                path: 'profile',
                element: <MyProfilePage />,
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
        ],
    },
])

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
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
    </StrictMode>
)
