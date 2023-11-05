import { useContext, useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../../contexts/Theme";
import useNavigateLocal from "../../../hooks/useNavigateLocal";
import { logout } from "../../../store/authSlice";
import { RootState } from "../../../store/store";
import "./sidebar.scss";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const dataUser = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigateLocal();

  const handleNavigateProfile = () => {
    navigate.directional("/profile", {
      isMyProfile: true,
      dataProfile: dataUser.dataUser.username,
    });
  };

  return (
    <aside className={`sidebar-collapse sidebar large-sidebar ${theme ? "dark" : ""}`}>
      <div className="logo-sidebar">
        <img src="/logo-gradient.svg" alt="logo" width={"150px"} />
      </div>

      <div className="user-nav-group">
        <div className="user-information">
          <div className="avatar-friend" onClick={handleNavigateProfile}>
            <img src={dataUser?.dataUser?.avatar} />
          </div>
        </div>

        <div className="menu">
          <NavLink to="/dashboard" className="nav-link">
            <img src="/dashboard-gray.svg" alt="" />
          </NavLink>
          <NavLink to="/community" className="nav-link">
            <img src="communication-gray.svg" alt="" />
          </NavLink>
          <NavLink to="/chat" className="nav-link">
            <img src="icon-gray.svg" alt="" />
          </NavLink>
          <NavLink to={`/profile/${dataUser.dataUser.username}`} className="nav-link">
            <img src="/setting-gray.svg" alt="" />
          </NavLink>
          <div className="nav-link nav-notification">
            <img src="/noti-gray.svg" alt="" />
          </div>
          <div className="nav-link nav-notification" onClick={() => dispatch(logout())}>
            <RiLogoutBoxRLine></RiLogoutBoxRLine>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
