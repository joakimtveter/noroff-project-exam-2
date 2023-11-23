import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '@/store'
import {
    UserObject,
    UserWithBookings,
    UserWithVenues,
    LoginRequest,
    RegisterUserObject,
    LoginResponse,
} from '@/types/user'
import { CreateVenue, UpdateVenue, Venue, VenueDetailed } from '@/types/venue'
import { BookingDetailed, BookingWithVenue, CreateBooking, UpdateBooking } from '@/types/booking'

export const holidazeApi = createApi({
    reducerPath: 'holidazeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.noroff.dev/api/v1/holidaze/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.accessToken
            if (token != null) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Booking', 'Profile', 'OwnProfile', 'Venue', 'VenueList'],
    endpoints: (builder) => ({
        getVenues: builder.query<Venue[], void>({
            query: () => 'venues?sort=created',
            providesTags: ['VenueList'],
        }),
        getTrendingVenues: builder.query<Venue[], void>({
            query: () => 'venues?sort=price&offset=5&limit=3',
        }),
        getVenueById: builder.query<VenueDetailed, string>({
            query: (id) => `venues/${id}?_owner=true&_bookings=true`,
            providesTags: ['Venue'],
        }),
        getOwnProfile: builder.query<UserWithBookings & UserWithVenues, string>({
            query: (name) => `profiles/${name}?_bookings=true&_venues=true`,
            providesTags: ['OwnProfile'],
        }),
        getProfileByName: builder.query<UserWithBookings & UserWithVenues, string>({
            query: (name) => `profiles/${name}?_venues=true`,
            providesTags: ['Profile'],
        }),
        updateUserAvatar: builder.mutation<UserObject, { name: string; body: { avatar: string } }>({
            query: ({ name, body }) => ({
                url: `profiles/${name}/media`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['OwnProfile'],
        }),
        becomeVenueManager: builder.mutation<UserObject, string>({
            query: (name) => ({
                url: `profiles/${name}`,
                method: 'PUT',
                body: {
                    venueManager: true,
                },
            }),
            invalidatesTags: ['OwnProfile'],
        }),
        registerProfile: builder.mutation<UserObject, RegisterUserObject>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['OwnProfile'],
        }),
        createVenue: builder.mutation<Venue, CreateVenue>({
            query: (body) => ({
                url: 'venues',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['VenueList'],
        }),
        updateVenue: builder.mutation<Venue, UpdateVenue>({
            query: ({ venueId, body }) => ({
                url: `venues/${venueId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Venue', 'VenueList'],
        }),
        deleteVenue: builder.mutation<Venue, string>({
            query: (venueId) => ({
                url: `venues/${venueId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['OwnProfile', 'VenueList'],
        }),
        createBooking: builder.mutation<BookingWithVenue, CreateBooking>({
            query: (body) => ({
                url: 'bookings',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['OwnProfile', 'Venue'],
        }),
        getBooking: builder.query<BookingWithVenue, string>({
            query: (bookingId) => `bookings/${bookingId}?_venue=true&_customer=true`,
            providesTags: ['Booking'],
        }),
        updateBooking: builder.mutation<BookingDetailed, UpdateBooking>({
            query: ({ bookingId, body }) => ({
                url: `bookings/${bookingId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Booking', 'Venue', 'Profile'],
        }),
        deleteBooking: builder.mutation<BookingWithVenue, string>({
            query: (bookingId) => ({
                url: `bookings/${bookingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile', 'Booking'],
        }),
    }),
})

export const {
    useGetVenueByIdQuery,
    useGetVenuesQuery,
    useGetTrendingVenuesQuery,
    useGetOwnProfileQuery,
    useGetProfileByNameQuery,
    useBecomeVenueManagerMutation,
    useLoginMutation,
    useRegisterProfileMutation,
    useUpdateUserAvatarMutation,
    useCreateVenueMutation,
    useUpdateVenueMutation,
    useDeleteVenueMutation,
    useCreateBookingMutation,
    useGetBookingQuery,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
} = holidazeApi
