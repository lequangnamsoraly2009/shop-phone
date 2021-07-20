import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  isLoadingCart: false,
  cartPayMentTemp: [],
  addressTemp: {},
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
    removeOneCart: (state, action) => {
      const cartRemove = action.payload;
      state.carts = state.carts.filter(cart => cart._id !== cartRemove)
    },
    removeCart: (state, action) => {
      state.carts = [];
    },
    addCartPayMentTemp: (state, action) => {
      state.cartPayMentTemp = action.payload;
    },
    removeCartPayMentTemp : (state, action) => {
      state.cartPayMentTemp = [];
    },
    addAddressTemp: (state, action) => {
      state.addressTemp = action.payload;
    },
    removeAddressTemp : (state, action) => {
      state.addressTemp = {};
    },
  },
  extraReducers: {},
});

const { actions, reducer } = cartSlice;

export const { getCartsPending, getCarts, addCart, removeCart, updateCart,removeOneCart,addCartPayMentTemp, removeCartPayMentTemp, addAddressTemp, removeAddressTemp  } =
  actions;

export default reducer;
