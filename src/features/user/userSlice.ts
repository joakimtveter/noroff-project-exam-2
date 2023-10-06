import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse, UserState } from '@/types/user';

const initialState: UserState = {
    isLogged: false,
    token: '',
    user: { id: '', name: '', email: '', avatar: '', venueManager: false },
};

function loadState(): UserState | undefined {
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
}

function saveState(state: UserState) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('user', serializedState);
    } catch (error) {
        // ignore write errors
        console.error(error);
    }
}

export const userSlice = createSlice({
    name: 'counter',
    initialState: loadState() || initialState,
    reducers: {
        logIn: (state, action: PayloadAction<LoginResponse>) => {
            state.isLogged = true;
            const { token, ...user } = action.payload;
            state.token = token;
            state.user = user;
            saveState(state);
        },
        logOut: (state) => {
            state = initialState;
            saveState(state);
        },
    },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
