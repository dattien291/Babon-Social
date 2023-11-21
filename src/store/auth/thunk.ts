import authServices from "@/services/authServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import to from "await-to-js";
import { isEmpty } from "lodash";
import { loadUserInfo } from "./authSlice";
import { setToken } from "@/request";

export const loginThunk: any = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }, { rejectWithValue, dispatch }: any) => {
    const [err, response]: any = await to(authServices.clientLogin({ username: data?.username, password: data?.password }));

    if (!isEmpty(err)) {
      return rejectWithValue(err);
    }

    setToken(response?.token);
    localStorage.setItem("Token", response?.token);

    dispatch(getMeThunk());
  }
);

export const getMeThunk = createAsyncThunk("app/getMe", async (_, { dispatch }) => {
  const [err, response] = await to(authServices.clientGetMe());
  if (!isEmpty(err)) return;

  dispatch(loadUserInfo(response));
});
