import { VenueMeta, Location } from '@/types/venue';
type CreateVenueParams = {
    name: string;
    description: string;
    media: string[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: VenueMeta;
    location: Location;
};

// TODO: Implement createVenue function
export function createVenue(params: CreateVenueParams) {
    console.log('createVenue: ', params);
}

// Test for required fields.
