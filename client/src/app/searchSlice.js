import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const cartSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = cartSlice;

export const {setSearch} = actions;

export default reducer;
