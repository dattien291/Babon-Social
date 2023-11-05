import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DashBoard from "../pages/dashboard/index";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, login } from "../store/authSlice";
import { RootState } from "../store/store";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import ChatDefault from "../pages/ChatDefault";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";

const Routers = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const dataUserLocalStorage = localStorage.getItem("User");
    if (dataUserLocalStorage) {
      const userLocalStorage: AuthState = JSON.parse(dataUserLocalStorage);
      dispatch(login(userLocalStorage.dataUser));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={dataUser.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={dataUser.isAuthenticated ? <DashBoard /> : <Navigate to="/login" />} />
      <Route path="/chat" element={dataUser.isAuthenticated ? <ChatDefault /> : <Navigate to="/login" />} />
      <Route path="/chat/:id" element={dataUser.isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
      <Route path="/profile" element={<Navigate to={`/profile/${dataUser.dataUser.username}`} />} />
      <Route path="/profile/myprofile" element={<Profile />} />
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  );
};

export default Routers;
