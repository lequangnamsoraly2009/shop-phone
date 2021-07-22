import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [],
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
      getHistory: (state,action) => {
          state.history = action.payload;
      }
    },
    extraReducers: {},
  });
  
  const { actions, reducer } = historySlice;
  
  export const {getHistory} = actions;
  
  export default reducer;
  