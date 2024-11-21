import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IProduct} from "../interfaces/interfaces.ts";

interface ProductState {
    products: IProduct[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<IProduct>) {
            state.products.push(action.payload);
        },
        deleteProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter((product) => product.id !== action.payload);
        },
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        }
    },
});

export const { addProduct, deleteProduct,setProducts } = productSlice.actions;
export default productSlice.reducer;
