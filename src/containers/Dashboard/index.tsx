import React from "react";
import DashboardPosts from "../../components/ContentDashboard/DashboardPosts/DashboardPosts";
import DashboardTrending from "../../components/ContentDashboard/DashboardTrending/DashboardTrending";
import { FC } from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar";

const DashBoard: FC = () => {
  return (
    <div className="ks-dashboard">
      <Sidebar />
      <DashboardPosts />
      <DashboardTrending />
    </div>
  );
};

export default DashBoard;
