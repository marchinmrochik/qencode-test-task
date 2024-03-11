import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApiMiddleware } from './apiMiddleware';
import {QENCODE_API} from "../../utils/constants";

export const tokenApi = createApi({
    reducerPath: 'tokenApi',
    baseQuery: fetchBaseQuery({ baseUrl: QENCODE_API }),
    endpoints: (builder) => ({
        accessToken: builder.mutation({
            query: () => '/auth/access-token',
            method: 'POST',
        }),
        refreshToken: builder.mutation({
            query: () => '/auth/refresh-token',
            method: 'POST',
        }),
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createApiMiddleware),
});

export const { useAccessTokenMutation, useRefreshTokenMutation } = tokenApi;
export default tokenApi;
