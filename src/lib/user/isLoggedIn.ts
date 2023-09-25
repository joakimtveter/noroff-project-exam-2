/**
 * Checks if user is logged in, by checking if token is present in local storage.
 * @returns {boolean} true if user is logged in, false if not
 */
export function isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (token) return true;
    return false;
}
