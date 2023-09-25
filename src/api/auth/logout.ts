export function logout(): void {
    console.log('User logged out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
