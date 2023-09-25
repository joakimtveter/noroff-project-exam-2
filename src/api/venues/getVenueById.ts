import { BASE_URL, get } from '@/api/client';
import { VenueDetailed } from '@/types/venue';

// TODO: Implement getVenueById function
export async function getVenueById(id: string): Promise<VenueDetailed> {
    const URL = `${BASE_URL}/venues/${id}?_owner=true&_bookings=true`;
    const venue = await get(URL);
    console.log('getVenueById: ', { url: URL, ...venue });
    return venue;
}
