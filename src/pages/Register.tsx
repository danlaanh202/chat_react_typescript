import { yupResolver } from "@hookform/resolvers/yup";
import TelegramIcon from "@mui/icons-material/Telegram";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ISignupUser } from "../types";
import Input from "../components/Input";
import Button from "../components/Button";
import { publicRequest } from "../utils/requestMethod";
import { Link, useNavigate } from "react-router-dom";
import useSnackbarState from "../hooks/useSnackbarState";
import SnackbarComponent from "../components/snackbar/SnackbarComponent";
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
  const navigate = useNavigate();
  const [snackbar, setSnackbar, severity, setSeverity, message, setMessage] =
    useSnackbarState();

  const onSubmitHandler = async (data: ISignupUser) => {
    if (!isValid) return;
    const { username, password } = data;

    try {
      await publicRequest
        .post("/auth/register", { username, password })
        .then((response) => {
          setSnackbar(true);
          setSeverity("success");
          setMessage("Create account successfully, redirecting...");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
    } catch (err) {
      setSnackbar(true);
      setSeverity("error");
      setMessage("Something happened");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-dark-bg dark:text-white gap-y-5 ">
      <div className="flex items-center justify-center w-20 h-20 rounded-full lg:w-40 lg:h-40 dark:bg-primary-color">
        <TelegramIcon className="!w-3/4 !h-3/4" />
      </div>
      <h1 className="text-3xl">Sign up to Telegram</h1>
      <p className="text-center ">
        Please enter your username and
        <br />
        password to register
      </p>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="lg:w-[360px] w-[90vw] flex flex-col gap-y-4  "
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
        <div>
          Already have an account?{" "}
          <Link className="text-gray-500 hover:text-white" to="/login">
            Login
          </Link>
        </div>
        <Button disabled={!isValid} isLoading={isSubmitting} type="submit">
          Sign up
        </Button>
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

export default Register;
