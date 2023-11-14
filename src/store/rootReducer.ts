import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export default rootReducer;
