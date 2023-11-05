import { useState, ChangeEvent, MouseEvent } from "react";
import "../styles/login.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { message } from "antd";
import useAuthenticator from "../hooks/useAuthenticator";
import useNavigateLocal from "../hooks/useNavigateLocal";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigateLocal();
  const authenticate = useAuthenticator();

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [messageApi, contextHolder] = message.useMessage();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSignIn = async (mode: string, event: MouseEvent<HTMLButtonElement>, ...args: any) => {
    event.preventDefault();
    const res = await authenticate.authenticate(mode, args);
    if (res.message === "success") {
      dispatch(login(res.data));
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  return (
    <section className="wrapper">
      <div className="background-image-login">
        <img src="/BGSocial.jpg" alt="" />
      </div>
      <div className="form-login">
        <div className="logo">
          <img src="/logo-gradient.svg" alt="logo" />
        </div>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username or phone number"
              value={userInfo.username}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" value={userInfo.password} onChange={handleOnChange} />
          </div>
          <button className="btn-login" onClick={(event) => handleSignIn("local", event, userInfo.username, userInfo.password)}>
            {contextHolder}
            Log in
          </button>
          <Link to="/">Forgotten Password?</Link>
        </form>
        <button onClick={(event) => handleSignIn("google", event)} className="signin-google">
          <img src="/google_logo.png" alt="" /> Sign in with Google
        </button>
        <div className="btn-group" onClick={() => navigate.directional("/sign-up")}>
          <button>Create New Account</button>
        </div>
      </div>
    </section>
  );
};

export default Login;
