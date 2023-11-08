import { CreatePost, PostList, PostModal } from "@/components/compound";
import { Avatar, Button, KaImage, KaLink } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { usePostsInfiniteQuery, usePostsQuery } from "@/features/posts";
import KsLayout from "@/layout";
import { RANDOM } from "@/utils/constants";
import classNames from "classnames";
import { flatMap, get, isEmpty } from "lodash";
import { FC, useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Stories from "./Stories";
import Switch from "./KaSwitch";

const DashBoard: FC = () => {
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const [dataPostModal, setDataPostModal] = useState<any>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const { data: posts, fetchNextPage, isFetching: isLoadingPosts } = usePostsInfiniteQuery();
  const { data: trendingPost, isFetching: isLoadingTrendingPost } = usePostsQuery({ limit: 1, page: 2 });

  const { ref: seeMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoadingPosts) fetchNextPage();
  }, [inView]);

  const handleOpenModal =
    ({ active, post }: any) =>
    (event: any) => {
      setDataPostModal({ active, post });
      setIsOpenModal(true);
    };

  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <KsLayout>
      <div className={classNames("ks-dashboard", { "-dark": theme })}>
        <PostModal open={isOpenModal} onClose={handleCloseModal} dataPostModal={dataPostModal} />

        <Sidebar />

        <div className="post">
          <div className="header heading">
            Hello {userInfo?.name},<h2 className="text">Share somethings with your friends</h2>
          </div>

          <Stories />

          <CreatePost />

          <PostList posts={flatMap(posts?.pages, (item) => item?.data) || []} />

          <div className="ks-posts" ref={seeMoreRef}>
            <div className={classNames("ks-post-card", { "-dark": theme })}>
              <div className="header">
                <div className="information">
                  <div className="avatar -skeleton" />
                  <div className="group">
                    <span className="name" />
                  </div>
                </div>
              </div>

              <div className="body -skeleton" />
            </div>
          </div>
        </div>

        <div className={classNames("trending", { "-dark": theme })}>
          <div className="sticky">
            <nav className="navigation">
              <div className="group">
                <Switch />

                <Button variant="contained" color="light" circle colorHover="light" className="button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
                <Button variant="contained" color="light" circle colorHover="light" className="button">
                  <i className="fa-regular fa-bell"></i>
                </Button>
              </div>

              <KaLink to={`/profile/${userInfo?.username}`} className="avatar">
                <Avatar src={userInfo?.avatar || ""} objectFit="cover" size="md" />
              </KaLink>
            </nav>

            <div className="feeds">
              <h4 className="heading">Trending Feeds 😀😀</h4>

              <div
                className={classNames("thumbnail", { "-skeleton": isLoadingTrendingPost })}
                onClick={handleOpenModal({ active: 0, post: get(trendingPost, "[0]", {}) })}
              >
                {!isLoadingTrendingPost && (
                  <KaImage
                    src={!isEmpty(trendingPost) && get(trendingPost, "[0].image[0]", "")}
                    alt="trending"
                    objectFit="cover"
                    className="image"
                  />
                )}
              </div>

              <div className="information">
                <KaLink
                  to={`/profile/${!isEmpty(trendingPost) && get(trendingPost, "[0].username", "")}`}
                  className="link"
                  color="primary"
                  hasUnderline
                >
                  <div className={classNames("avatar", { "-skeleton": isLoadingTrendingPost })}>
                    {!isLoadingTrendingPost && (
                      <Avatar src={!isEmpty(trendingPost) && get(trendingPost, "[0].avatar", "")} objectFit="cover" size="md" />
                    )}
                  </div>

                  <div className="info">
                    <span className="name">{!isEmpty(trendingPost) && get(trendingPost, "[0].name", "")}</span>
                  </div>
                </KaLink>
              </div>

              <p className={classNames("text paragraph", { "-skeleton": isLoadingTrendingPost })}>
                {!isEmpty(trendingPost) && !isLoadingTrendingPost && get(trendingPost, "[0].text", "")}
              </p>
            </div>

            <div className="suggestion">
              <h4 className="heading">Suggestion 💖💖</h4>
            </div>
          </div>
        </div>
      </div>
    </KsLayout>
  );
};

export default DashBoard;
