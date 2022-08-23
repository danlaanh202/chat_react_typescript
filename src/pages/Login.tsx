import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { ILoginUser, IUser } from "../types";
import { login } from "../utils/auth";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be longer than 6 characters"),
});
const Login = () => {
  const {
    register,
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
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser?._id) {
      navigate("/");
    }
  }, []);
  const { isFetching, error } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch<Dispatch<any>>();
  const onSubmitHandler = (data: ILoginUser) => {
    if (!isValid) return;
    login(dispatch, data);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-dark-bg dark:text-white gap-y-5 ">
      <div className="w-40 h-40 rounded-full dark:bg-primary-color">
        <img
          className="object-cover "
          src="https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-telegram-1.png"
          alt=""
        />
      </div>
      <h1 className="text-3xl">Sign in to Telegram</h1>
      <p className="text-center ">
        Please confirm your username and
        <br />
        password to login
      </p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-[360px] flex flex-col gap-y-4  "
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
    </div>
  );
};

export default Login;
