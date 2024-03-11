import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from "./features/user/userSlice";
import userApi from "./services/userApi";
import tokenApi from "./services/tokenApi";
import { createApiMiddleware } from './services/apiMiddleware';
import {githubApi} from "./services/githubApi";

export const store = configureStore({
    reducer: {
        user: userSlice,
        [userApi.reducerPath]: userApi.reducer,
        [tokenApi.reducerPath]: tokenApi.reducer,
        [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, tokenApi.middleware, githubApi.middleware),
});

// Note for future use:
// If there is a need to use the createApiMiddleware for additional services in the future,
// include it in the configureStore.middleware parameters, similar to how it's done for userApi.middleware and tokenApi.middleware.
// Example:
// configureStore.middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(userApi.middleware, tokenApi.middleware, createApiMiddleware(service1), createApiMiddleware(service2), ...)


setupListeners(store.dispatch)
