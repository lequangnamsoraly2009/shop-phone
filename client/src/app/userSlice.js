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
  socket: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    getSocket: (state, action) => {
      state.socket = action.payload;
    },
    getLogout: (state, action) => {
      state.isBuyer = false;
      state.isAdmin = false;
      state.user = {};
      state.isLoading = false;
      state.isLoggedIn = false;
      state.socket = null;
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

export const { getSocket, loginPending, getLogout } = actions;

export default reducer;
