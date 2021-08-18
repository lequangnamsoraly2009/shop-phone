import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuestionProductAPI from "../api/questionProductAPI";

export const getAllQuestionForProduct = createAsyncThunk(
  "/questionProducts/getAllQuestionForProducts",
  async ({ product_id, token }) => {
    const response = await QuestionProductAPI.getAllQuestionForProduct({
      product_id,
      token,
    });
    return response.data.questions;
  }
);

const initialState = {
  questionProducts: [],
};

const categoryPendingQuestionProduct = createSlice({
  name: "questionProduct",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllQuestionForProduct.fulfilled]: (state, action) => {
      state.questionProducts = action.payload;
    },
  },
});

const {  reducer } = categoryPendingQuestionProduct;

// export const { setPaginationPendingQuestionProducts } = actions;

export default reducer;
