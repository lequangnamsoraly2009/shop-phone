import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PaymentAPI from "../api/paymentAPI";

export const getAllPayments = createAsyncThunk(
  "/payment/getAllPayments",
  async ({ searchPayments, token }) => {
    const response = await PaymentAPI.getAllPayments({ searchPayments, token });
    return response.data.payments;
  }
);

const initialState = {
  payments: [],
  searchPayments: "",
  paginationPayments: [],
  informationPaymentPaypal: {},
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    getPayments: (state, action) => {
      state.payments = action.payload;
    },
    setSearchPayments: (state, action) => {
      state.searchPayments = action.payload;
    },
    setPaginationPayments: (state, action) => {
      state.paginationPayments = action.payload;
    },
    setInformationPaymentPaypal: (state, action) => {
      state.informationPaymentPaypal = action.payload;
    }
  },
  extraReducers: {
    [getAllPayments.fulfilled]: (state, action) => {
      state.payments = action.payload;
      state.paginationPayments = action.payload;
    },
  },
});

const { actions, reducer } = paymentSlice;

export const { getPayments, setSearchPayments, setPaginationPayments, setInformationPaymentPaypal } =
  actions;

export default reducer;
