import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../assets/fake-data/User";

export interface AuthState {
  isAuthenticated: boolean;
  dataUser: User;
}

interface InfoUpdatePayload {
  avatar: string;
}

const initialState: AuthState = {
  isAuthenticated: true,
  dataUser: { id: "", name: "", username: "", password: "", avatar: "", bio: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.dataUser = action.payload;
      // localStorage.setItem("User", JSON.stringify(state));
    },
    updateInfo: (state, action: PayloadAction<InfoUpdatePayload>) => {
      state.dataUser.avatar = action.payload.avatar;
    },
    updateCoverPhotoProfile: (state, action: PayloadAction<string>) => {
      state.dataUser.coverPicture = { url: action.payload, blurHash: "" };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateInfo, updateCoverPhotoProfile } = authSlice.actions;

export default authSlice.reducer;
