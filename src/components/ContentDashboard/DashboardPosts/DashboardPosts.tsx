import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./dashboardposts.scss";
import CreatePost from "../../CreatePost/CreatePost";
import ListPosts from "../../ListPosts/ListPosts";
import Stories from "../../Stories/Stories";
import useIsInViewport from "../../../hooks/useIsInViewPort";
import useListPost from "../../../hooks/useListPosts";
import ListPostsSkeleton from "../../ListPosts/ListPostsSkeleton";

export interface DataPostSubmit {
  textArea: string;
  image: string[];
}

interface DashboardPostsProps {
  maxWidthContent: string;
}

const DashboardPosts: React.FC<DashboardPostsProps> = ({ maxWidthContent }) => {
  const dataUser = useSelector((state: RootState) => state.auth);
  const seeMoreRef = useRef<HTMLDivElement>(null);
  const seeMoreIsInViewport = useIsInViewport(seeMoreRef);
  const {} = useListPost(seeMoreIsInViewport);

  return (
    <div className={`post post-${maxWidthContent}`}>
      <div className="header">
        Hello {dataUser.dataUser.name},
        <span style={{ display: "block", fontSize: "25px", color: "gray" }}>Share somthings with your friends</span>
      </div>
      <Stories />
      <CreatePost />
      <ListPosts />
      <ListPostsSkeleton seeMoreRef={seeMoreRef} />
    </div>
  );
};

export default DashboardPosts;
