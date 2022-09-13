import * as yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ILoginUser, IUser } from "../types";
import { login } from "../utils/auth";
import { Dispatch } from "@reduxjs/toolkit";
import SnackbarComponent from "../components/snackbar/SnackbarComponent";
import useSnackbarState from "../hooks/useSnackbarState";
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be longer than 6 characters"),
});
const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ILoginUser>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const currentUser = useSelector(
    (state: IRootState) => state.user.currentUser as IUser
  );
  const [snackbar, setSnackbar, severity, setSeverity, message, setMessage] =
    useSnackbarState();

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser?._id) {
      navigate("/");
    }
  }, []);
  // const { isFetching, error } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch<Dispatch<any>>();
  const onSubmitHandler = (data: ILoginUser) => {
    // setSnackbar(true);
    // console.log("snackbar");
    if (!isValid) return;
    login(dispatch, data, setSnackbar, setSeverity, setMessage);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-dark-bg dark:text-white gap-y-5 ">
      <div className="flex items-center justify-center w-20 h-20 rounded-full lg:w-40 lg:h-40 dark:bg-primary-color">
        <TelegramIcon className="!w-3/4 !h-3/4" />
      </div>
      <h1 className="text-xl lg:text-3xl">Sign in to Telegram</h1>
      <p className="text-center">
        Please confirm your username and
        <br />
        password to login
      </p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="lg:w-[360px] w-[90vw] flex flex-col gap-y-4  "
      >
        <Input
          id="username"
          control={control}
          name="username"
          placeholder="username"
          error={errors?.username?.message}
        />
        <Input
          id="password"
          control={control}
          type="password"
          name="password"
          placeholder="password"
          error={errors?.password?.message}
        />
        <div className="flex justify-between mb-2 text-sm">
          <span>
            Don't have account?{" "}
            <Link className="text-gray-500 hover:text-white" to="/register">
              Register
            </Link>
          </span>
          <span>Forget password?</span>
        </div>
        <Button type="submit">Sign in</Button>
      </form>
      <SnackbarComponent
        open={snackbar}
        setOpen={setSnackbar}
        message={message}
        severity={severity}
      />
    </div>
  );
};

export default Login;
