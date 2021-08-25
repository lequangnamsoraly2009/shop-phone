import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VoucherAPI from "../api/voucherAPI";

export const getVoucher = createAsyncThunk(
  "/voucher/getVoucher",
  async ({token}) => {
    const response = await VoucherAPI.getVoucher({token});
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
    [getVoucher.fulfilled]: (state, action) => {
      state.vouchers = action.payload;
    },
  },
});

const { reducer } = voucherSlice;

// export const {} = actions;

export default reducer;
