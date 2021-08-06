import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryAPI from "../api/categoryAPI";

export const getAllCategories = createAsyncThunk(
  "/category/getAllCategories",
  async (searchCategories, thunkAPI) => {
    const response = await CategoryAPI.getAllCategories(searchCategories);
    return response.data.categories;
  }
);

const initialState = {
  categories: [],
  searchCategories: "",
  paginationCategories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSearchCategories: (state, action) => {
      state.searchCategories = action.payload;
    },
    setPaginationCategories: (state, action) => {
      state.paginationCategories = action.payload;
    },
  },
  extraReducers: {
    [getAllCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.paginationCategories = action.payload;
    },
  },
});

const { actions, reducer } = categorySlice;

export const { getCategories, setSearchCategories, setPaginationCategories } =
  actions;

export default reducer;
