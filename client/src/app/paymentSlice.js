import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  searchPayments: "",
  paginationPayments: [],
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
  },
  extraReducers: {},
});

const { actions, reducer } = paymentSlice;

export const { getPayments, setSearchPayments, setPaginationPayments } =
  actions;

export default reducer;
