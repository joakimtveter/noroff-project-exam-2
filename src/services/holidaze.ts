import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Venue, VenueDetailed } from '@/types/venue';

export const holidazeApi = createApi({
    reducerPath: 'holidazeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.noroff.dev/api/v1/holidaze/' }),
    endpoints: (builder) => ({
        getVenueById: builder.query<VenueDetailed, string>({
            query: (id) => `venues/${id}?_owner=true&_bookings=true`,
        }),
        getVenues: builder.query<Venue[], string>({
            query: () => `venues`,
        }),
        getTrendingVenues: builder.query<Venue[], string>({
            query: () => `venues?sort=rating&limit=3`,
        }),
        getProfileByName: builder.query<VenueDetailed, string>({
            query: (name) => `profiles/${name}?_owner=true&_bookings=true`,
        }),
        registerProfile: builder.mutation<any, any>({
            query: (body) => ({
                url: `profiles`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetVenueByIdQuery, useGetVenuesQuery, useGetTrendingVenuesQuery, useGetProfileByNameQuery } =
    holidazeApi;
