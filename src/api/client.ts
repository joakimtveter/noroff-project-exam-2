import { getToken } from '@/lib/user';

export const BASE_URL = 'https://api.noroff.dev/api/v1/holidaze';

// TODO: Implement error toasts
export async function get(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function authenticatedGet(url: string) {
    try {
        const token = getToken();
        if (!token) throw new Error('No token found');
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function post(url: string, requestBody: Record<string, any>) {
    try {
        const token = getToken();
        if (!token) throw new Error('No token found');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function put(url: string, requestBody: Record<string, any>) {
    try {
        const token = getToken();
        if (!token) throw new Error('No token found');
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function remove(url: string) {
    try {
        const token = getToken();
        if (!token) throw new Error('No token found');
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
