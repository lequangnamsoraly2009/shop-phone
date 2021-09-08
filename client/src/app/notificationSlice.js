import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NotificationAPI from "../api/notificationAPI";

export const getNotificationForUser = createAsyncThunk(
  "/notification/getNotificationForUser",
  async ({ token }) => {
    const response = await NotificationAPI.getNotificationForUser({ token });
    return response.data.notifications;
  }
);

export const getNotificationForAdmin = createAsyncThunk(
  "/notification/getNotificationForAdmin",
  async ({ token }) => {
    const response = await NotificationAPI.getNotificationForAdmin({ token });
    return response.data.notifications;
  }
);

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: {
    [getNotificationForUser.fulfilled]: (state, action) => {
      state.notifications = action.payload;
    },
    [getNotificationForAdmin.fulfilled]: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

const { reducer } = notificationSlice;

// export const { setTimeVoucherTemp } = actions;

export default reducer;
