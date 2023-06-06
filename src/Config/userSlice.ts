import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface UserState  {
    user: {
        name: string,
        email: string,
    } | null
}

const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        updateUserProfile: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            }
        }
    }
});

export const {
    loginUser,
    logout,
    updateUserProfile
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer