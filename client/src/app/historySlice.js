import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HistoryAPI from "../api/historyAPI";

export const getHistoryCustomer = createAsyncThunk("/history/getHistory", async(token)=>{
  const response = await HistoryAPI.getHistoryCustomer(token);
  return response.data;
})

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
    extraReducers: {
      [getHistoryCustomer.fulfilled]: (state,action) => {
        state.history = action.payload;
      }
    },
  });
  
  const { actions, reducer } = historySlice;
  
  export const {getHistory} = actions;
  
  export default reducer;
  