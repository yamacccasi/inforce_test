import {configureStore} from '@reduxjs/toolkit';
import productReducer from './productSlice.ts'

const store = configureStore({
    reducer: {
        products: productReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;