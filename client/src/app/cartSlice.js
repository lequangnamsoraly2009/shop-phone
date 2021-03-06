import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartAPI from "../api/cartAPI";

export const getCartUser = createAsyncThunk("/carts/getCartUser", async(token)=>{
  const response = await CartAPI.getCartUser(token);
  return response.data.cart;
})

const initialState = {
  carts: [],
  isLoadingCart: false,
  // cartPayMentTemp: [],
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
      state.carts = state.carts.filter((cart) => cart._id !== cartRemove);
    },
    removeManyCart: (state, action) => {
      const listCartRemove = action.payload;
      listCartRemove.forEach((item) => {
        state.carts = state.carts.filter((cart) => cart._id !== item._id);
      });
    },
    removeCart: (state, action) => {
      state.carts = [];
    },
    // addCartPayMentTemp: (state, action) => {
    //   state.cartPayMentTemp = action.payload;
    // },
    // removeCartPayMentTemp: (state, action) => {
    //   state.cartPayMentTemp = [];
    // },
    addAddressTemp: (state, action) => {
      state.addressTemp = action.payload;
    },
    removeAddressTemp: (state, action) => {
      state.addressTemp = {};
    },
  },
  extraReducers: {
    [getCartUser.fulfilled]: (state, action) => {
      state.carts = action.payload;
    }
  },
});

const { actions, reducer } = cartSlice;

export const {
  getCartsPending,
  getCarts,
  addCart,
  removeCart,
  updateCart,
  removeOneCart,
  removeManyCart,
  // addCartPayMentTemp,
  // removeCartPayMentTemp,
  addAddressTemp,
  removeAddressTemp,

} = actions;

export default reducer;
