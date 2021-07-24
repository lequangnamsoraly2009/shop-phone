import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        getCategories: (state, action )=>{
            state.categories = action.payload;
        }    
    },
    extraReducers:{}
})

const {actions,reducer} = categorySlice;

export const {getCategories} = actions;

export default reducer;