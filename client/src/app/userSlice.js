import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBuyer: false,
  isAdmin: false,
  user: {},
  isLoading: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
      state.isLoggedIn = true;
    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    isABuyer: (state, action) => {
      state.isBuyer = action.payload;
      state.isAdmin = false;
    },
    isAAdmin: (state, action) => {
      state.isBuyer = false;
      state.isAdmin = action.payload;
    },
    getLogout: (state, action) => {
      state.isBuyer = false;
      state.isAdmin = false;
      state.user = {};
      state.isLoading = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = userSlice;

export const { getUser, isAAdmin, isABuyer, loginPending, getLogout } = actions;

export default reducer;
