import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse, UserObject } from '@/types/profile';

export interface UserState {
    value: number;
    isLogged: boolean;
    token: string;
    user: UserObject;
}

const initialState: UserState = {
    value: 0, //TODO: Remove this when finished
    isLogged: false,
    token: '',
    user: { id: '', name: '', email: '', avatar: '', venueManager: false },
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const saveState = (state: UserState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('user', serializedState);
    } catch (error) {
        // ignore write errors
        console.error(error);
    }
};

export const userSlice = createSlice({
    name: 'counter',
    initialState: loadState() || initialState,
    reducers: {
        logIn: (state, action: PayloadAction<LoginResponse>) => {
            state.isLogged = true;
            const { token, ...user } = action.payload;
            state.token = token;
            state.user = user;
        },
        logOut: (state) => {
            state = initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
