import { useState, ChangeEvent, MouseEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadUserInfo } from "@/store/auth/authSlice";
import { Button, KaImage } from "@/components/primitive";
import { GroupInput } from "@/components/compound";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { thunkWrapper } from "@/helpers";
import { loginThunk } from "@/store/auth/thunk";
import { useAppDispatch } from "@/store/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setFieldValue, resetForm, handleSubmit, values, errors } = useFormik({
    initialValues: {
      username: "hieu123",
      password: "123456",
    },

    onSubmit: async (values, { setSubmitting }) => {
      // login(v).then((response) => {
      //   if (response?.message === "success") {
      //     dispatch(loadUser(response?.data));
      //     toast.success("Successfully !");
      //   }

      //   if (response?.message !== "success") {
      //     toast.error(response?.message);
      //   }
      // });

      await thunkWrapper({
        promise: dispatch(loginThunk(values)),
        thunkAction: loginThunk,
        onSuccess: () => toast.success("Login successful !"),
        onError: () => null,
      });

      setSubmitting(false);
      resetForm();
    },
  });

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values?.username || !values?.password) {
      toast.error("Username and password are required");
      return null;
    }

    handleSubmit();
  };

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  return (
    <div className="ks-login">
      <div className="background" />

      <form className="login-form" onSubmit={handleSubmitForm}>
        <div className="logo">
          <KaImage src="/logo-gradient.svg" alt="" className="image" objectFit="contain" />
        </div>

        <GroupInput
          type="text"
          className="input"
          name="username"
          placeholder="Username..."
          onChange={handleChange}
          value={values.username}
          error={errors.username}
        />
        <GroupInput
          type="password"
          className="input"
          name="password"
          placeholder="Password..."
          onChange={handleChange}
          value={values.password}
          error={errors.password}
        />

        <Button fullWidth className="button" type="submit" variant="contained">
          Login
        </Button>

        <Button fullWidth className="button -register" variant="contained" onClick={() => navigate("/register")}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Login;
