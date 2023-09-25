import { BASE_URL, post } from '@/api/client';

type LoginCredentials = {
    email: string;
    password: string;
};

// TODO: test function
export async function login(userData: LoginCredentials): Promise<void> {
    const response = await post(`${BASE_URL}/auth/login`, userData);
    const data = JSON.parse(response.data);
    const { token, ...user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}
