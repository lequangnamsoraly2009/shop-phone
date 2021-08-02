import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBuyer: false,
  isAdmin: false,
  user: {},
  isLoading: false,
  isLoggedIn: false,
  deviceUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    getDeviceUser: (state, action) => {
      state.deviceUser = action.payload;
    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
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

export const {
  getDeviceUser,
  getUser,
  isAAdmin,
  isABuyer,
  loginPending,
  getLogout,
} = actions;

export default reducer;
