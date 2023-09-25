import { BASE_URL } from '@/api/client';

// TODO: Implement createVenue function
export function deleteVenue(id: string): void {
    const URL = `${BASE_URL}/venues/${id}`;
    console.log('deleteVenue: ', URL);
}
