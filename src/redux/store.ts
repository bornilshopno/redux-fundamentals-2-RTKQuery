import { configureStore } from '@reduxjs/toolkit';
import { baseAPI } from './api/baseApi';


export const store = configureStore({
    reducer: {
        [baseAPI.reducerPath]:baseAPI.reducer
    },
    middleware:(getDefaultMiddlware)=>getDefaultMiddlware().concat(baseAPI.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

