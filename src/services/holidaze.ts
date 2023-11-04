import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '@/store'
import { CreateVenue, UpdateVenue, Venue, VenueDetailed } from '@/types/venue'
import {
    LoginResponse,
    UserObject,
    UserWithBookings,
    UserWithVenues,
    LoginRequest,
    RegisterUserObject,
} from '@/types/user'

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
    tagTypes: ['Profile', 'Venue', 'VenueList'],
    endpoints: (builder) => ({
        getVenueById: builder.query<VenueDetailed, string>({
            query: (id) => `venues/${id}?_owner=true&_bookings=true`,
            providesTags: ['Venue'],
        }),
        getVenues: builder.query<Venue[], string>({
            query: () => 'venues?sort=created',
            providesTags: ['VenueList'],
        }),

        getTrendingVenues: builder.query<Venue[], string>({
            query: () => 'venues?sort=rating&limit=3',
        }),
        getOwnProfile: builder.query<UserWithBookings & UserWithVenues, string>({
            query: (name) => `profiles/${name}?_bookings=true&_venues=true`,
            providesTags: ['Profile'],
        }),
        getProfileByName: builder.query<UserWithBookings & UserWithVenues, string>({
            query: (name) => `profiles/${name}?_venues=true`,
        }),
        updateUserAvatar: builder.mutation<UserObject, { name: string; body: { avatar: string } }>({
            query: (query) => ({
                url: `profiles/${query.name}/media`,
                method: 'PUT',
                body: query.body,
            }),
            invalidatesTags: ['Profile'],
        }),
        becomeVenueManager: builder.mutation<UserObject, string>({
            query: (name) => ({
                url: `profiles/${name}`,
                method: 'PUT',
                body: {
                    venueManager: true,
                },
            }),
            invalidatesTags: ['Profile'],
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
        }),
        createVenue: builder.mutation<Venue, CreateVenue>({
            query: (body) => ({
                url: 'venues',
                method: 'POST',
                body,
            }),
        }),
        updateVenue: builder.mutation<Venue, UpdateVenue>({
            query: ({ venueId, body }) => ({
                url: `venues/${venueId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Venue'],
        }),
        deleteVenue: builder.mutation<Venue, string>({
            query: (venueId) => ({
                url: `venues/${venueId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile', 'Venue'],
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
} = holidazeApi
