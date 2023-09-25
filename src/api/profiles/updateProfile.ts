import { VenueMeta, Location } from '@/types/venue';
type UpdateVenueParams = {
    name: string;
    description: string;
    media: string[];
    price: number;
    maxGuests: number;
    rating: number;
    meta: VenueMeta;
    location?: Location;
};

// TODO: Implement updateVenue function
export function updateVenue(id: string, params: UpdateVenueParams) {
    console.log('updateVenue: ', id, params);
}
