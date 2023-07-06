import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/Theme";

interface ListPostsSkeletonProps {
  seeMoreRef: React.RefObject<HTMLDivElement> | null;
}

const ListPostsSkeleton: React.FC<ListPostsSkeletonProps> = ({ seeMoreRef }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div ref={seeMoreRef}>
      <div className="list-posts">
        <div className={`post-item post-skeleton ${theme ? "dark" : ""}`}>
          <div className="post-item-header">
            <div className="friend-info">
              <div className="avatar-friend"></div>
              <div className="name-group">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <div className="post-body-skeleton"></div>

          <div className="post-item-footer">
            <div className="options"></div>
            <div className="options"></div>
            <div className="options"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPostsSkeleton;
