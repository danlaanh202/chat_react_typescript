import { ILoginUser } from "./../types/index";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
} from "../redux/userRedux";
import { publicRequest } from "./requestMethod";
import { Dispatch } from "@reduxjs/toolkit";
import { clearRoom } from "../redux/roomRedux";

export const login = async (
  dispatch: Dispatch<any>,
  user: ILoginUser,
  setSnackbar?: any,
  setSeverity?: any,
  setMessage?: any
) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    setSnackbar(true);
    setSeverity("success");
    setMessage("Login successfully");
    setInterval(() => {
      dispatch(loginSuccess(res.data));
    }, 2000);
  } catch (err) {
    setSnackbar(true);
    setSeverity("error");
    setMessage("Something happened");
    setInterval(() => {
      dispatch(loginFailure(err as string));
    }, 2000);
  }
};
export const logout = async (dispatch: Dispatch<any>) => {
  dispatch(logoutStart());
  dispatch(logoutSuccess());
  dispatch(clearRoom());
};
