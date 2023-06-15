import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserState } from './userSlice';



const initialState = {
    users: [] as UserState[],
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.users = action.payload
        },
    }
});

export const {
    addUsers,
} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer