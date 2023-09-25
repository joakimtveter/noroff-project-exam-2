import { BASE_URL, post } from '@/api/client';

type RegisterUser = {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    venueManager?: boolean;
};

// The name value must not contain punctuation symbols apart from underscore (_).
// The email value must be a valid stud.noroff.no or noroff.no email address.
// The password value must be at least 8 characters.
// The avatar value must be a valid URL.
// The venueManager value must be a boolean. If true the user will be able to create, edit, and delete venues.

// TODO: setup feedback for user
export async function registerUser(userData: RegisterUser): Promise<void> {
    // const { name, email, password, avatar, venueManager = false } = userData;
    // console.log(name, email, password, avatar, venueManager);
    const response = await post(`${BASE_URL}/auth/register`, userData);
    if (response.status === 201) {
        console.log('User registered');
    }
}
