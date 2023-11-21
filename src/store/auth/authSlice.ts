import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./constants";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserInfo: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },

    updateUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },

    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loadUserInfo, logout, updateUserInfo } = authSlice.actions;

export default authSlice;
