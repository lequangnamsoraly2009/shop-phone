import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserAPI from "../api/userAPI";

export const getUserLogin = createAsyncThunk(
  "/user/getUserLogin",
  async (token) => {
    const response = await UserAPI.getUserLogin(token);
    return response.data;
  }
);

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
  extraReducers: {
    [getUserLogin.fulfilled]: (state, action) => {
      const dataUser = action.payload;
      if (dataUser.role === 0) {
        state.isBuyer = true;
      } else {
        state.isAdmin = true;
      }
      state.isLoggedIn = true;
      state.user = dataUser;
    },
  },
});

const { actions, reducer } = userSlice;

export const { getUser, isAAdmin, isABuyer, loginPending, getLogout } = actions;

export default reducer;
