import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PendingQuestionProductAPI from "../api/pendingQuestionProductAPI";

export const getAllPendingQuestionProducts = createAsyncThunk(
  "/questionProducts/getAllPendingQuestionProducts",
  async ({token}) => {
    const response =
      await PendingQuestionProductAPI.getAllPendingQuestionProducts({token});
    return response.data.pendingQuestions;
  }
);

const initialState = {
  pendingQuestionProducts: [],
  paginationPendingQuestionProducts: [],
};

const categoryPendingQuestionProduct = createSlice({
  name: "pendingQuestionProduct",
  initialState,
  reducers: {
    setPaginationPendingQuestionProducts: (state, action) => {
      state.paginationPendingQuestionProducts = action.payload;
    },
  },
  extraReducers: {
    [getAllPendingQuestionProducts.fulfilled]: (state, action) => {
      state.pendingQuestionProducts = action.payload;
      state.paginationPendingQuestionProducts = action.payload;
    },
  },
});

const { actions, reducer } = categoryPendingQuestionProduct;

export const { setPaginationPendingQuestionProducts } = actions;

export default reducer;
