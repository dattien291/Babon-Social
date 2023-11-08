import { get } from "lodash";
import { createSelector } from "reselect";
import { initialState } from "./constants";

const selectAuthStore = (state: any) => state.auth || initialState;

export const selectUserInfo = createSelector([selectAuthStore], (state) => get(state, "userInfo", {}));
