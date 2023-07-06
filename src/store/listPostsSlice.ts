import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../assets/fake-data/Posts";

export interface PostsState {
  isLoading: boolean;
  listPosts: Post[];
}

const initialState: PostsState = {
  isLoading: false,
  listPosts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    refreshPosts: (state) => {
      state.isLoading = true;
      state.listPosts = [];
    },
    postsRequest: (state) => {
      state.isLoading = true;
    },
    postsSucess: (state, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.listPosts = action.payload;
    },
    postLike: (state, action: PayloadAction<string>) => {
      state.listPosts = state.listPosts.map((post) =>
        post.id === action.payload
          ? { ...post, like: !post.like, likeCount: post.like ? post.likeCount - 1 : post.likeCount + 1 }
          : post
      );
    },
    addNewPostState: (state, action: PayloadAction<Post>) => {
      // state.listPosts = state.listPosts.push(action.payload)
      state.listPosts = [action.payload, ...state.listPosts];
    },
  },
});

// Action creators are generated for each case reducer function
export const { postsRequest, postsSucess, postLike, addNewPostState, refreshPosts } = postsSlice.actions;

export default postsSlice.reducer;
