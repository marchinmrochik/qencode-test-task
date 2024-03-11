import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID} from "../../utils/constants";

export const githubApi = createApi({
    reducerPath: 'githubApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Укажите свой путь к API
    endpoints: (builder) => ({
        getAccessToken: builder.mutation({
            query: (code) => ({
                url: 'https://github.com/login/oauth/access_token',
                method: 'POST',
                body: {
                    client_id: GITHUB_CLIENT_ID,
                    client_secret: GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getUserProfile: builder.query({
            query: (accessToken) => ({
                url: 'https://api.github.com/user',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
    }),
});

export const { useGetAccessTokenMutation, useGetUserProfileQuery } = githubApi;
