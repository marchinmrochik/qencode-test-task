import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {QENCODE_API} from "../../utils/constants";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: QENCODE_API }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        signUp:  builder.mutation({
            query: (data) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: data,
            }),
        }),
        passwordReset: builder.mutation({
            query: (email) => ({
                url: '/auth/password-reset',
                method: 'POST',
                body: email,
            }),
        }),
        setPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/password-set',
                method: 'POST',
                body: data,
            }),
        }),
    })
});

export const { useLoginMutation, usePasswordResetMutation, useSetPasswordMutation, useSignUpMutation  } = userApi;
export default userApi;
