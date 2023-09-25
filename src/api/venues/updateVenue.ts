import { BASE_URL } from '@/api/client';

import { VenueMeta, Location } from '@/types/venue';
type UpdateVenueParams = {
    name?: string;
    description?: string;
    media?: string[];
    price?: number;
    maxGuests?: number;
    rating?: number;
    meta?: VenueMeta;
    location?: Location;
};

// TODO: Implement updateVenue function
// 1. Create the endpoint URL
// 2. Make a PUT request to the endpoint
export function createVenue(id: string, params: UpdateVenueParams) {
    const URL = `${BASE_URL}/venues/${id}`;
    console.log('createVenue: ', URL, params);
}

// Test changeing everything.
// Check if  _owner and _bookings do anything other than returning more data.
