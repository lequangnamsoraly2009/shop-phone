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
  timeVoucherTemp: "",
};

const voucherSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTimeVoucherTemp: (state, action) => {
      state.timeVoucherTemp = action.payload;
    },
  },
  extraReducers: {
    [getVoucher.fulfilled]: (state, action) => {
      state.vouchers = action.payload;
    },
  },
});

const {actions, reducer } = voucherSlice;

export const {setTimeVoucherTemp} = actions;

export default reducer;
