import { BASE_URL } from '@/api/client';
import { getUserName } from '@/lib/user';

export function updateProfileAvatar(avatarUrl: string): void {
    const username = getUserName();
    if (!username) throw new Error('updateProfileAvatar: username is not set');
    const URL = `${BASE_URL}/profile/avatar/${username}`;
    console.log('updateProfileAvatar: ', URL, avatarUrl);
}
