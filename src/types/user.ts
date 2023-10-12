interface BaseUserObject {
    name: string;
    email: string;
    avatar?: string;
    venueManager: boolean;
}

export interface RegisterUserObject extends BaseUserObject {
    password: string;
}

export interface UserObject extends BaseUserObject {
    id: string;
}

export interface LoginResponse extends UserObject {
    accessToken: string;
}

export interface UserState {
    isLogged: boolean;
    accessToken: string;
    user: UserObject;
}
