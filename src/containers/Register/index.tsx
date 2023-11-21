import { GroupInput } from "@/components/compound";
import { Button, KaImage } from "@/components/primitive";
import { useAppDispatch } from "@/store/hooks";
import { useFormik } from "formik";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setFieldValue, resetForm, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
    },

    onSubmit: (v) => {
      toast.success("Successful account registration !");
      navigate("/login");
      resetForm();
    },
  });

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values?.username || !values?.password || !values?.name) {
      toast.error("Invalid data");
      return null;
    }

    handleSubmit();
  };

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  return (
    <div className="ks-register">
      <div className="background" />

      <form className="register-form" onSubmit={handleSubmitForm}>
        <div className="logo">
          <KaImage src="/logo-gradient.svg" alt="" className="image" objectFit="contain" />
        </div>

        <GroupInput
          type="text"
          className="input"
          name="name"
          placeholder="Your name..."
          onChange={handleChange}
          value={values.name}
          error={errors.name}
        />

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

        <Button fullWidth className="button" type="submit" variant="contained" color="light-green">
          Register
        </Button>

        <Button fullWidth className="button" variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Register;
