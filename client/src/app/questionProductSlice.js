import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuestionProductAPI from "../api/questionProductAPI";

export const getAllQuestionForProduct = createAsyncThunk(
  "/questionProducts/getAllQuestionForProducts",
  async ({ product_id }) => {
    const response = await QuestionProductAPI.getAllQuestionForProduct({
      product_id,
    });
    return response.data.questions;
  }
);
// Get Data the first page
export const getAllQuestionForPagination = createAsyncThunk(
  "/questionProducts/getAllQuestionForPagination",
  async ({ product_id, page, pageSize }) => {
    const response = await QuestionProductAPI.getQuestionForProductPage({
      product_id,
      page,
      pageSize,
    });
    return response.data.questions;
  }
);

const initialState = {
  questionProducts: [],
  paginationQuestionProducts: [],
};

const categoryPendingQuestionProduct = createSlice({
  name: "questionProduct",
  initialState,
  reducers: {
    setPaginationQuestionProducts: (state, action) => {
      state.paginationQuestionProducts = action.payload;
    },
  },
  extraReducers: {
    [getAllQuestionForProduct.fulfilled]: (state, action) => {
      state.questionProducts = action.payload;
    },
    [getAllQuestionForPagination.fulfilled]: (state, action) => {
      state.paginationQuestionProducts = action.payload;
    },
  },
});

const { actions, reducer } = categoryPendingQuestionProduct;

export const { setPaginationQuestionProducts } = actions;

export default reducer;
