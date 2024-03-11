import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    refreshToken: '',
    accessToken: '',
    isLoggedIn: false,
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.refreshToken = '';
            state.accessToken = '';
            state.isLoggedIn = false;
            state.user = {};
        },
    },
})

export const { setTokens, setLoggedIn, setUser, logout } = userSlice.actions

export default userSlice.reducer
