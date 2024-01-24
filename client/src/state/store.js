import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user.slice"

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})