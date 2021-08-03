import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers: {},
});

const { actions, reducer } = userAdminSlice;

export const {
  getAllUsers,
  getAllUserDevices,
  setSearchUsers,
  setPaginationUsers,
} = actions;

export default reducer;
