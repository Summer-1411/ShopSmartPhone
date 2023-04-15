import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false,
        isLoggedIn: false
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.error = true;
            state.isLoggedIn = false;
            state.currentUser = null
        },
        logout: (state) => {
            state.isLoading = false;
            state.error = false;
            state.isLoggedIn = false;
            state.currentUser = null
        },
        updateUser: (state, action) => {
            console.log({...state.currentUser, ...action.payload});
            state.isLoading = false;
            state.error = false;
            state.isLoggedIn = true;
            state.currentUser = {...state.currentUser, ...action.payload}
        }
    }
})

export const { setAuth,loginStart, loginSuccess, loginFailure, logout, updateUser } = userSlice.actions
export default userSlice.reducer