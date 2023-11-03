import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse, UserState } from '@/types/user'

const initialState: UserState = {
    isLoggedIn: false,
    accessToken: '',
    user: { id: '', name: '', email: '', avatar: '', venueManager: false },
}

function loadState(): UserState | undefined {
    try {
        const serializedState = localStorage.getItem('user')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        console.error(error)
        return undefined
    }
}

function saveState(state: UserState): void {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('user', serializedState)
    } catch (error) {
        // ignore write errors
        console.error(error)
    }
}

function deleteState(): void {
    try {
        localStorage.removeItem('user')
    } catch (error) {
        // ignore write errors
        console.error(error)
    }
}

export const userSlice = createSlice({
    name: 'counter',
    initialState: loadState() || initialState,
    reducers: {
        logIn: (state, action: PayloadAction<LoginResponse>) => {
            state.isLoggedIn = true
            const { accessToken, ...user } = action.payload
            state.accessToken = accessToken
            state.user = user
            saveState(state)
        },
        logOut: (state) => {
            state.isLoggedIn = false
            state.accessToken = ''
            state.user = initialState.user
            deleteState()
        },
        updateAvatar: (state, action: PayloadAction<string>) => {
            state.user.avatar = action.payload
            saveState(state)
        },
        becomeVenueManager: (state) => {
            state.user.venueManager = true
            saveState(state)
        },
    },
})

// Action creators are generated for each case reducer function
export const { logIn, logOut, updateAvatar, becomeVenueManager } = userSlice.actions

export default userSlice.reducer
