import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
};

const userSlice = createSlice({
    name: "history",
    initialState,
    reducers: {
      
    },
    extraReducers: {},
  });
  
  const { actions, reducer } = userSlice;
  
  export const {} = actions;
  
  export default reducer;
  