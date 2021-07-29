import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsFilter: [],
  categoryFilter: "",
  sortFilter: "",
  searchFilter: "",
  pageFilter: 1,
  resultFilter: 20,
  paginationFilter: [],
};

const productFilterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsFilter: (state, action) => {
      state.productsFilter = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setSortFilter: (state, action) => {
      state.sortFilter = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
    setPageFilter: (state, action) => {
      state.pageFilter = action.payload;
    },
    setResultFilter: (state, action) => {
      state.resultFilter = action.payload;
    },
    setPaginationFilter: (state, action) => {
      state.paginationFilter = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = productFilterSlice;

export const {
  getProductsFilter,
  setCategoryFilter,
  setSortFilter,
  setSearchFilter,
  setPageFilter,
  setResultFilter,
  setPaginationFilter
} = actions;

export default reducer;
