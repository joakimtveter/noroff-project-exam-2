import { BASE_URL, get } from '@/api/client';

type getVenuesParams = {
    sort?: 'rating' | 'maxGuests' | 'price' | 'name' | 'created' | 'updated'; //No need to sort by id, since it is random.
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
    owner?: boolean;
    bookings?: boolean;
};

/**
 * Get venues from the API. Unauthenticated call.
 */
export async function getVenues(params: getVenuesParams = {}) {
    const { sort = null, sortOrder = null, limit = null, offset = null, owner = null, bookings = null } = params;
    const queryParams: string[] = [];
    if (sort) queryParams.push(`sort=${sort}`);
    if (sortOrder) queryParams.push(`sortOrder=${sortOrder}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (offset) queryParams.push(`offset=${offset}`);
    if (owner) queryParams.push(`_owner=${owner}`);
    if (bookings) queryParams.push(`_bookings=${bookings}`);

    const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    const URL = `${BASE_URL}/venues${queryString}`;

    const venues = await get(URL);
    return venues;
}
