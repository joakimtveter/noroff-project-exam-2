import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import { holidazeApi } from './services/holidaze';

export const store = configureStore({
    reducer: {
        [holidazeApi.reducerPath]: holidazeApi.reducer,
        profile: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(holidazeApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
