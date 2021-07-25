import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsFilter: [],
  categoryFilter: "",
  sortFilter: "",
  searchFilter: "",
  pageFilter: 1,
  resultFilter: 0,
};

const productFilterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsFilter: (state, action) => {
      state.products = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setSortFilter: (state, action) => {
      state.sort = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.search = action.payload;
    },
    setPageFilter: (state, action) => {
      state.page = action.payload;
    },
    setResultFilter: (state, action) => {
      state.result = action.payload;
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
} = actions;

export default reducer;
