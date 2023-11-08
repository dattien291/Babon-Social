import DashBoard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { loadUser } from "../store/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

const Routers = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: any) => state?.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      document?.pictureInPictureElement && document?.exitPictureInPicture();
    };
  }, [pathname]);

  useEffect(() => {
    const dataUsers = localStorage.getItem("User");

    if (dataUsers) {
      const data: any = JSON.parse(dataUsers);
      dispatch(loadUser(data.userInfo));
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return <div></div>;

  return (
    <Routes>
      <Route path="/" element={auth?.isAuthenticated ? <DashBoard /> : <Navigate to="/login" />} />
      <Route path="/login" element={auth?.isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:slug" element={<Profile />} />
    </Routes>
  );
};

export default Routers;
