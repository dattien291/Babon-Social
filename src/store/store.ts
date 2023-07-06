import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import profileReducer from "../store/profileSlice";
import listPostsReducer from "../store/listPostsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: listPostsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
