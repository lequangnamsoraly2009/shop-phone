import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserAPI from "../api/userAPI";

export const getAllAdminUsers = createAsyncThunk(
  "/usersAdmin/getAllAdminUsers",
  async ({ searchUsers }, token) => {
    const response = await UserAPI.getAllAdminUsers({ searchUsers }, token);
    return response.data.users;
  }
);

const initialState = {
  users: [],
  searchUsers: "",
  paginationUsers: [],
  deviceUsers: [],
};

const userAdminSlice = createSlice({
  name: "usersAdmin",
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getAllUserDevices: (state, action) => {
      state.deviceUsers = action.payload;
    },
    setSearchUsers: (state, action) => {
      state.searchUsers = action.payload;
    },
    setPaginationUsers: (state, action) => {
      state.paginationUsers = action.payload;
    },
  },
  extraReducers: {
    [getAllAdminUsers.fulfilled]: (state, action) => {
      const dataUsers = action.payload;
      const responseFilter = dataUsers.filter((user) => user.role !== 1);
      state.paginationUsers = responseFilter;
      state.deviceUsers = responseFilter;
      state.users = responseFilter.slice(0, 10);
    },
  },
});

const { actions, reducer } = userAdminSlice;

export const {
  getAllUsers,
  getAllUserDevices,
  setSearchUsers,
  setPaginationUsers,
} = actions;

export default reducer;
