import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  isMyProfile: boolean;
  dataProfile: string;
}

const initialState: ProfileState = {
  isMyProfile: false,
  dataProfile: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ProfileState>) => {
      state.dataProfile = action.payload.dataProfile;
      state.isMyProfile = action.payload.isMyProfile;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
