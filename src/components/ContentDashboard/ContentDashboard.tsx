import React from "react";
import "./contentdashboard.scss";
import DashboardPosts from "./DashboardPosts/DashboardPosts";
import DashboardTrending from "./DashboardTrending/DashboardTrending";

interface ContentDashboardProps {
  maxWidthContent: string;
}

const ContentDashboard: React.FC<ContentDashboardProps> = ({ maxWidthContent }) => {
  return (
    <div style={{ flexGrow: "1" }} className="content-dashboard">
      <DashboardPosts maxWidthContent={maxWidthContent} />
      <DashboardTrending />
    </div>
  );
};

export default ContentDashboard;
