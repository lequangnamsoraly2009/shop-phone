
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
// import API from "../api/axiosClient"

export const refreshToken = createAsyncThunk(
  "token/refreshToken",
  async () => {
    const loginCurrent = localStorage.getItem("firstLogin");
    if (loginCurrent) {
      const response = await axios.post("http://localhost:3001/users/refresh_token");
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
    removeToken: (state, action) => {
      state.token = ""
    }
  },
  extraReducers: {
    [refreshToken.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
  },
});

const { reducer, actions } = tokenSlice;

export const { setToken,removeToken } = actions;

export default reducer;