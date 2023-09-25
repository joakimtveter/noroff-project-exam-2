import { get, BASE_URL } from '@/api/client';

type getBookingByIdParams = {
    owner?: boolean;
    bookings?: boolean;
};

export async function getBookingById(id: string, params: getBookingByIdParams) {
    const { owner = false, bookings = false } = params;
    const queryParams: string[] = [];
    if (owner) queryParams.push('_owner=true');
    if (bookings) queryParams.push('_bookings=true');

    const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    const booking = await get(`${BASE_URL}/bookings/${id}${queryString}`);
    return booking;
}
