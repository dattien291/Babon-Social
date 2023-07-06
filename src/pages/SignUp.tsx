import { useState, ChangeEvent, MouseEvent } from "react";
import "../styles/login.scss";
import { signUp } from "../assets/fake-data/User";
import { message } from "antd";
import useNavigateLocal from "../hooks/useNavigateLocal";
// import axios from "axios";

const SignUp = () => {
  const navigate = useNavigateLocal();

  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [messageApi, contextHolder] = message.useMessage();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (!userInfo.username || !userInfo.password || !userInfo.name) {
      messageApi.open({
        type: "error",
        content: "Display name, username and password are required",
      });
      return;
    }

    const singUpUser = async () => {
      await signUp(userInfo.name, userInfo.username, userInfo.password);
      navigate.directional("/login");
    };
    singUpUser();
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
        <form action="">
          <div className="form-group">
            <input type="text" name="name" placeholder="Display name" value={userInfo.name} onChange={handleOnChange} />
          </div>
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
          <button className="btn-login" onClick={handleOnSubmit}>
            {contextHolder}
            Sign up
          </button>
        </form>
        <div className="btn-group" onClick={() => navigate.directional("/login")}>
          <button>Log in</button>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
