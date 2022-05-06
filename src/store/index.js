import { configureStore } from "@reduxjs/toolkit"
import posts from "./slices/postSlice"

export const store = configureStore({
    reducer: { posts }
})