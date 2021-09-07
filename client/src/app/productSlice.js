import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductFilterAPI from "../api/productAPI";

export const getAllProductsFilter = createAsyncThunk(
  "/product/getAllProductFilter",
  async ({ categoryFilter, sortFilter, searchFilter, pageFilter }) => {
    const response = await ProductFilterAPI.getAllProductsFilter({
      categoryFilter,
      sortFilter,
      searchFilter,
      pageFilter,
    });
    return response.data.products;
  }
);

export const getAllProductsFilterForAdmin = createAsyncThunk(
  "/product/getAllProductsFilterForAdmin",
  async ({ categoryFilter, sortFilter, searchFilter, pageFilter }) => {
    const response = await ProductFilterAPI.getAllProductsFilterForAdmin({
      categoryFilter,
      sortFilter,
      searchFilter,
      pageFilter,
    });
    return response.data.products;
  }
);

export const getAllProducts = createAsyncThunk(
  "/product/getAllProduct",
  async () => {
    const response = await ProductFilterAPI.getAllProducts();
    return response.data.products;
  }
);

const initialState = {
  productsAdmin: [],
  products: [],
  productsFilter: [],
  categoryFilter: "",
  sortFilter: "",
  searchFilter: "",
  pageFilter: 1,
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
    setPaginationFilter: (state, action) => {
      state.paginationFilter = action.payload;
    },
  },
  extraReducers: {
    [getAllProductsFilter.fulfilled]: (state, action) => {
      state.productsFilter = action.payload;
      state.paginationFilter = action.payload;
    },
    [getAllProductsFilterForAdmin.fulfilled]: (state, action) => {
      state.productsAdmin = action.payload;
      state.paginationFilter = action.payload;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
  },
});

const { actions, reducer } = productFilterSlice;

export const {
  getProductsFilter,
  setCategoryFilter,
  setSortFilter,
  setSearchFilter,
  setPageFilter,
  setPaginationFilter,
} = actions;

export default reducer;
