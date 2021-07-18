import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCarts: (state, action) => {
      state.carts = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = cartSlice;

export const { addCarts } = actions;

export default reducer;
