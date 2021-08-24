import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VoucherAPI from "../api/voucherAPI";

export const getAllVoucher = createAsyncThunk(
  "/voucher/getAllVoucher",
  async ({token}) => {
    const response = await VoucherAPI.getAllVoucher({token});
    return response.data.vouchers;
  }
);

const initialState = {
  vouchers: [],
};

const voucherSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // getVouchers: (state, action) => {
    //   state.vouchers = action.payload;
    // },
  },
  extraReducers: {
    [getAllVoucher.fulfilled]: (state, action) => {
      state.vouchers = action.payload;
    },
  },
});

const { reducer } = voucherSlice;

// export const {} = actions;

export default reducer;
