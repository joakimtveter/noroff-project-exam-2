import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse, UserState } from '@/types/user';

const initialState: UserState = {
    isLoggedIn: false,
    accessToken: '',
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

function deleteState() {
    try {
        localStorage.removeItem('user');
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
            state.isLoggedIn = true;
            const { accessToken, ...user } = action.payload;
            state.accessToken = accessToken;
            state.user = user;
            saveState(state);
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.accessToken = '';
            state.user = initialState.user;
            deleteState();
        },
    },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
