import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vouchers: [],
};

const voucherSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getVouchers: (state, action) => {
      state.vouchers = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = voucherSlice;

export const {setSearch} = actions;

export default reducer;
