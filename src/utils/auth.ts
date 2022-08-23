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

export const login = async (dispatch: Dispatch<any>, user: ILoginUser) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err as string));
  }
};
export const logout = async (dispatch: Dispatch<any>) => {
  dispatch(logoutStart());
  dispatch(logoutSuccess());
};
