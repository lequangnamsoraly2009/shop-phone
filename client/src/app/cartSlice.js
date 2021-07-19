import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  isLoadingCart: false,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    getCartsPending: (state, action) => {
      state.isLoadingCart = true;
    },
    getCarts: (state, action) => {
      state.carts = action.payload;
      state.isLoadingCart = false;
    },
    addCart: (state, action) => {
      state.carts.push(action.payload);
    },
    updateCart: (state, action) => {
      const newCartUpdate = action.payload;
      const cartIndex = state.carts.findIndex(
        (cart) => cart._id === newCartUpdate._id
      );
      if (cartIndex >= 0) {
        state.carts[cartIndex] = newCartUpdate;
      }
    },
    removeCart: (state, action) => {
      state.carts = [];
    },
  },
  extraReducers: {},
});

const { actions, reducer } = cartSlice;

export const { getCartsPending, getCarts, addCart, removeCart, updateCart } =
  actions;

export default reducer;
