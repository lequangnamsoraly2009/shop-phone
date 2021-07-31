import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    searchCategories: "",
    paginationCategories: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        getCategories: (state, action )=>{
            state.categories = action.payload;
        },
        setSearchCategories: (state, action) => {
            state.searchCategories = action.payload;
        },
        setPaginationCategories: (state, action) => {
            state.paginationCategories = action.payload;
        }    
    },
    extraReducers:{}
})

const {actions,reducer} = categorySlice;

export const {getCategories,setSearchCategories,setPaginationCategories} = actions;

export default reducer;