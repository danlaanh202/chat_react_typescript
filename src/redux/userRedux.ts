import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
  currentUser: {
    username?: string;
    password?: string;
    email?: string;
    accessToken?: string;
    _id?: string;
  };
  isFetching: boolean | undefined;
  error: string[] | undefined;
}
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isFetching: false,
    error: [] as string[],
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error.push(action.payload);
    },
    logoutStart: (state) => {
      state.isFetching = true;
      state.error = [];
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error.push(action.payload);
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = {};
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutFailure,
  logoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
