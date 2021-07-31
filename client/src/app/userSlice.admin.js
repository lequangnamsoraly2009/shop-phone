import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  searchUsers: "",
  paginationUsers: [],
};

const userAdminSlice = createSlice({
  name: "usersAdmin",
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.users = action.payload;
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

export const { getAllUsers, setSearchUsers, setPaginationUsers } = actions;

export default reducer;
