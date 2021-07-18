import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    getCarts: (state, action) => {
      state.carts = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = cartSlice;

export const { getCarts } = actions;

export default reducer;
