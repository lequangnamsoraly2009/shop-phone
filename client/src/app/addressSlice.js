import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AddressAPI from "../api/addressAPI";

export const getDataProvince = createAsyncThunk(
  "/address/getDataProvince",
  async () => {
    const response = await AddressAPI.getDataProvince();
    return response.data.data;
  }
);

export const getDataDistrict = createAsyncThunk(
  "/address/getDataDistrict",
  async ({ provinceSelect }) => {
    const response = await AddressAPI.getDataDistrict({ provinceSelect });
    return response.data.data;
  }
);
export const getDataWard = createAsyncThunk(
  "/address/getDataWard",
  async ({ districtSelect }) => {
    const response = await AddressAPI.getDataWard({ districtSelect });
    return response.data.data;
  }
);

const initialState = {
  dataProvince: [],
  dataDistrict: [],
  dataWard: [],
  provinceSelect: null,
  districtSelect: null,
  wardSelect: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setProvince: (state, action) => {
      state.provinceSelect = action.payload;
    },
    setDistrict: (state, action) => {
      state.districtSelect = action.payload;
    },
    setWard: (state, action) => {
      state.wardSelect = action.payload;
    },
  },
  extraReducers: {
    [getDataProvince.fulfilled]: (state, action) => {
      state.dataProvince = action.payload;
    },
    [getDataDistrict.fulfilled]: (state, action) => {
      state.dataDistrict = action.payload;
    },
    [getDataWard.fulfilled]: (state, action) => {
      state.dataWard = action.payload;
    },
  },
});

const { actions, reducer } = addressSlice;

export const { setProvince, setDistrict, setWard } = actions;

export default reducer;
