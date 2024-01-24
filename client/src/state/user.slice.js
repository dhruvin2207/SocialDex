import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: { user: {} },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
        },
        logOut: (state, action) => {
            state.user = {}
        }
    }
})

export const { setUser, logOut } = authSlice.actions
export default authSlice.reducer