import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ISignupUser } from "../types";
import Input from "../components/Input";
import Button from "../components/Button";
import { publicRequest } from "../utils/requestMethod";
import { Link } from "react-router-dom";
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be longer than 6 characters"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ISignupUser>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmitHandler = async (data: ISignupUser) => {
    if (!isValid) return;
    const { username, password } = data;
    console.log({ username, password });
    try {
      await publicRequest
        .post("/auth/register", { username, password })
        .then((response) => {
          console.log(response.data);
        });
    } catch (err) {
      console.log(err);
    }
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
      <h1 className="text-3xl">Sign up to Telegram</h1>
      <p className="text-center ">
        Please enter your username and
        <br />
        password to register
      </p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-[360px] flex flex-col gap-y-4  "
      >
        <Input
          id="username"
          control={control}
          name="username"
          placeholder="Username"
          error={errors?.username?.message}
        />
        <Input
          id="password"
          control={control}
          type="password"
          name="password"
          placeholder="Password"
          error={errors?.password?.message}
        />
        <Input
          id="confirmPassword"
          control={control}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          error={errors?.confirmPassword?.message}
        />
        <Link to="/login">Already have an account?</Link>
        <Button disabled={!isValid} isLoading={isSubmitting} type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Register;
