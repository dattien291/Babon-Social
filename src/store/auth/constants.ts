export interface AuthState {
  isAuthenticated: boolean;
  userInfo: any;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: {},
};
