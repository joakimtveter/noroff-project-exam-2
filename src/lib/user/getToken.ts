/**
 * Returns the users access token from localStorage.
 * @returns {string | undefined} the token of the user if logged in.
 */
export function getToken(): string | undefined {
    const token = localStorage.getItem('token');
    if (token) return token;
    return undefined;
}
