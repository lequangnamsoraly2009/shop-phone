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
    addCart: (state, action) => {
      state.carts.push(action.payload);
    },
    removeCart: (state, action) => {
      state.carts = []
    }
  },
  extraReducers: {},
});

const { actions, reducer } = cartSlice;

export const { getCarts ,addCart,removeCart} = actions;

export default reducer;
