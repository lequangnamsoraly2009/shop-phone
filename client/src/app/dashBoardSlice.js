import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  operatingSystem: [],
  client: [],
  device: [],
  dataPaymentFilterMonth: [],
};

const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setOperatingSystem: (state, action) => {
      state.operatingSystem = action.payload;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
    setDataPaymentFilterMonth: (state, action) => {
      state.dataPaymentFilterMonth = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = dashBoardSlice;

export const {
  setOperatingSystem,
  setClient,
  setDevice,
  setDataPaymentFilterMonth,
} = actions;

export default reducer;
