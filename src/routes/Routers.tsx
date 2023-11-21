import DashBoard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { useAppDispatch } from "@/store/hooks";
import { getMeThunk } from "@/store/auth/thunk";
import { setToken } from "@/request";
import { thunkWrapper } from "@/helpers";

const Routers = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: any) => state?.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document?.pictureInPictureElement && document?.exitPictureInPicture();
    };
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    const getMe = async () => {
      setToken(token);
      await thunkWrapper({
        promise: dispatch(getMeThunk()),
        thunkAction: getMeThunk,
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false),
      });
    };

    getMe();
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
