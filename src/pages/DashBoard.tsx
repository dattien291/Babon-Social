import React, { useState, useEffect, Suspense, useContext } from "react";
import "../styles/dashboard.scss";
import Sidebar from "../components/UI/Sidebar/Sidebar";
import { ThemeContext } from "../contexts/Theme";
import Snow from "../components/UI/Snow/Snow";

// import ContentDashboard from "../components/ContentDashboard/ContentDashboard";

const ContentDashboard = React.lazy(() => import("../components/ContentDashboard/ContentDashboard"));

const DashBoard: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [onModeCollapse, setOnModeCollapse] = useState<boolean>(true);
  const [widthSidebar, setWidthSidebar] = useState<string>("small");

  useEffect(() => {
    if (!onModeCollapse) {
      setWidthSidebar("large");
    } else {
      toggleSidebar ? setWidthSidebar("large") : setWidthSidebar("small");
    }
  }, [onModeCollapse, toggleSidebar]);

  const handleMouseOver = () => {
    if (onModeCollapse) {
      setToggleSidebar(true);
    } else {
      return;
    }
  };

  const handleMouseOut = () => {
    if (onModeCollapse) {
      setToggleSidebar(false);
    } else {
      return;
    }
  };

  return (
    <div>
      <div className={`background-image ${theme ? "dark-bg" : ""}`}>{theme && <Snow />}</div>
      <div className="wrapper-dashboard">
        <div
          className={`wrapper-sidebar ${widthSidebar}`}
          style={{
            transition: "min-width 0.2s linear",
          }}
        >
          <Sidebar
            toggleSidebar={toggleSidebar}
            handleMouseOver={handleMouseOver}
            handleMouseOut={handleMouseOut}
            onModeCollapse={onModeCollapse}
            setOnModeCollapse={setOnModeCollapse}
          />
        </div>
        <Suspense>
          <ContentDashboard maxWidthContent={widthSidebar} />
        </Suspense>
      </div>
      {/* {dataUser.username} <button onClick={handleLogout}>Log out</button> */}
    </div>
  );
};

export default DashBoard;
