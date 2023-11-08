import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./constants";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      localStorage.setItem("User", JSON.stringify(state));
    },
    // updateInfo: (state, action: PayloadAction<any>) => {
    //   state.userInfo.avatar = action.payload.avatar;
    // },
    // updateCoverPhotoProfile: (state, action: PayloadAction<string>) => {
    //   state.userInfo.coverPicture = { url: action.payload, blurHash: "" };
    // },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loadUser, logout } = authSlice.actions;

export default authSlice;
