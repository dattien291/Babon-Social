import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./sidebar.scss";
import { RiBarChartHorizontalLine, RiLogoutBoxRLine } from "react-icons/ri";
import { Tooltip } from "antd";
import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { logout } from "../../../store/authSlice";
import useNavigateLocal from "../../../hooks/useNavigateLocal";
import { ThemeContext } from "../../../contexts/Theme";

interface SidebarProp {
  toggleSidebar: boolean;
  onModeCollapse: boolean;
  setOnModeCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
}

const Sidebar = ({ toggleSidebar, handleMouseOver, handleMouseOut, onModeCollapse, setOnModeCollapse }: SidebarProp) => {
  const { theme } = useContext(ThemeContext);
  const dataUser = useSelector((state: RootState) => state.auth);
  const dispath = useDispatch();
  const navigate = useNavigateLocal();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [delayShowMenu, setDelayShowMenu] = useState<boolean>(false);
  //Show list icon in 1 time
  useEffect(() => {
    let timer = setTimeout(() => {
      setDelayShowMenu(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleNavigateProfile = () => {
    navigate.directional("/profile", {
      isMyProfile: true,
      dataProfile: dataUser.dataUser.username,
    });
  };

  return (
    <aside
      className={`${onModeCollapse ? "sidebar-collapse sidebar" : "sidebar"} ${
        toggleSidebar ? "large-sidebar" : "small-sidebar"
      } ${theme ? "dark" : ""}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="logo-sidebar">
        <img src="/logo-gradient.svg" alt="logo" width={"150px"} />
        <Tooltip title={`Collapse: ${onModeCollapse ? "On" : "Off"}`} color={"rgb(7, 142, 200)"}>
          <button onClick={() => setOnModeCollapse((prev) => !prev)}>
            <RiBarChartHorizontalLine></RiBarChartHorizontalLine>
          </button>
        </Tooltip>
      </div>
      <div className="toggle-menu" onClick={() => setToggleMenu(!toggleMenu)}>
        {toggleMenu ? <CloseOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <div className={`user-nav-group ${toggleMenu ? "menu-show" : ""}`}>
        <div className="user-infomation">
          <div className="avatar-friend" onClick={handleNavigateProfile}>
            {dataUser.dataUser.avatar ? (
              <img src={dataUser.dataUser.avatar} />
            ) : (
              dataUser.dataUser.name.slice(0, 2).toLocaleUpperCase()
            )}
          </div>
          <div className="user-name">{dataUser.dataUser.name}</div>
        </div>
        <div className={`menu ${delayShowMenu ? "" : "hide-menu"}`}>
          <NavLink to="/dashboard" className="nav-link">
            <img src="/dashboard-gray.svg" alt="" /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/community" className="nav-link">
            <img src="communication-gray.svg" alt="" /> <span>Community</span>
          </NavLink>
          <NavLink to="/chat" className="nav-link">
            <img src="icon-gray.svg" alt="" /> <span>Chat</span>
          </NavLink>
          <NavLink to={`/profile/${dataUser.dataUser.username}`} className="nav-link">
            <img src="/setting-gray.svg" alt="" /> <span>Settings</span>
          </NavLink>
          <div className="nav-link nav-notification">
            <img src="/noti-gray.svg" alt="" />
          </div>
          <div className="nav-link nav-notification" onClick={() => dispath(logout())}>
            <RiLogoutBoxRLine></RiLogoutBoxRLine>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
