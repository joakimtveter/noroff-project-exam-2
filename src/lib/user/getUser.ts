import type { UserObject } from '@/types/user';

/**
 * Gets the user object from local storage.
 * @returns {UserObject | undefined} the user object if logged in.
 */
export function getUser(): UserObject | undefined {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    return undefined;
}
