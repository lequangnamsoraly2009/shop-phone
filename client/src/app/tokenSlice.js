
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const refreshToken = createAsyncThunk(
  "token/refreshToken",
  async () => {
    const loginCurrent = localStorage.getItem("firstLogin");
    if (loginCurrent) {
      const response = await axios.get("/users/refresh_token");
      return response.data.accessToken;
    }
  }
);

const initialState = {
  token: "",
};
 
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: {
    [refreshToken.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
  },
});

const { reducer, actions } = tokenSlice;

export const { setToken } = actions;

export default reducer;