import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        getProducts: (state, action )=>{
            state.products = action.payload;
        }    
    },
    extraReducers:{}
})

const {actions,reducer} = productSlice;

export const {getProducts} = actions;

export default reducer;