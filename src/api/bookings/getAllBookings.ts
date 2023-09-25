import { get, BASE_URL } from '@/api/client';

type getAllBookingsParams = {
    sort?: string; // TODO:find all possible values
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
    customer?: boolean;
    venue?: boolean;
};

export async function getAllBookings(params: getAllBookingsParams) {
    const { sort = null, sortOrder = null, limit = null, offset = null, customer = null, venue = null } = params;
    const queryParams: string[] = [];
    if (sort) queryParams.push(`sort=${sort}`);
    if (sortOrder) queryParams.push(`sortOrder=${sortOrder}`);
    if (limit) queryParams.push(`limit=${limit}`);
    if (offset) queryParams.push(`offset=${offset}`);
    if (customer) queryParams.push(`_customer=${customer}`);
    if (venue) queryParams.push(`_venue=${venue}`);

    const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    const bookings = await get(`${BASE_URL}/bookings${queryString}`);
    return bookings;
}
