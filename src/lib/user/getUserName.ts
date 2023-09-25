/**
 * Gets the name of the user form local storage, if user is logged in.
 * @returns {string | undefined} the name of the user, if logged in.
 */
export function getUserName(): string | undefined {
    const userObject = localStorage.getItem('user');
    if (userObject) {
        const user = JSON.parse(userObject);
        return user.name;
    }
    return undefined;
}
