import { CreatePost, PostList, PostModal } from "@/components/compound";
import { Avatar, Button, KaImage, KaLink } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { usePostsInfiniteQuery, usePostsQuery } from "@/features/posts";
import { useSuggestQuery } from "@/features/suggest";
import KsLayout from "@/layout";
import classNames from "classnames";
import { flatMap, get, last, map } from "lodash";
import { FC, useContext, useState } from "react";
import { useSelector } from "react-redux";
import Switch from "./KaSwitch";
import Sidebar from "./Sidebar";
import Stories from "./Stories";

const DashBoard: FC = () => {
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const [dataPostModal, setDataPostModal] = useState<any>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const { data: posts, fetchNextPage, isFetching: isLoadingPosts } = usePostsInfiniteQuery();
  const { data: trendingPost, isFetching: isLoadingTrendingPost } = usePostsQuery({ limit: 1, page: 3 });
  const { data: suggestList, isFetching: isLoadingSuggest, isError: isErrorSuggest } = useSuggestQuery({ limit: 1, page: 1 });

  const handleOpenModal =
    ({ active, post }: any) =>
    (event: any) => {
      setDataPostModal({ active, post });
      setIsOpenModal(true);
    };

  const handleCloseModal = () => setIsOpenModal(false);

  const handleNextPage = () => {
    if (isLoadingPosts) return;

    fetchNextPage();
  };

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

          <CreatePost onSuccess={handleNextPage} />

          <PostList
            posts={flatMap(posts?.pages, (item) => item?.data?.items) || []}
            onNextPage={handleNextPage}
            hasNextPage={last(posts?.pageParams) !== false}
          />
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
                onClick={handleOpenModal({ active: 0, post: get(trendingPost?.items, "[0]", {}) })}
              >
                {!isLoadingTrendingPost && (
                  <KaImage src={get(trendingPost?.items, "[0].image[0]", "")} alt="trending" objectFit="cover" className="image" />
                )}
              </div>

              <div className="information">
                <KaLink to={`/profile/${get(trendingPost?.items, "[0].username", "")}`} className="link" color="primary" hasUnderline>
                  <div className={classNames("avatar", { "-skeleton": isLoadingTrendingPost })}>
                    {!isLoadingTrendingPost && (
                      <Avatar src={get(trendingPost?.items, "[0].author.avatar", "")} objectFit="cover" size="md" />
                    )}
                  </div>

                  <div className="info">
                    <span className="name">{get(trendingPost?.items, "[0].author.name", "")}</span>
                  </div>
                </KaLink>
              </div>

              <p className={classNames("text paragraph", { "-skeleton": isLoadingTrendingPost })}>
                {get(trendingPost?.items, "[0].text", "")}
              </p>
            </div>

            <div className="suggestion">
              <h4 className="heading">Suggestion 💖💖</h4>

              <ul className="list">
                {!isLoadingSuggest && !isErrorSuggest ? (
                  map(suggestList?.items, (item, index) => (
                    <li className="item" key={index}>
                      <KaLink to={`/profile/${item?.username}`} className="link" color="primary" hasUnderline>
                        <div className={classNames("avatar", { "-skeleton": isLoadingSuggest })}>
                          {!isLoadingSuggest && <Avatar src={item?.avatar || ""} objectFit="cover" size="md" />}
                        </div>

                        <div className="info">
                          <span className="name">{item?.name}</span>
                        </div>
                      </KaLink>
                    </li>
                  ))
                ) : (
                  <li className={classNames("item", { "-skeleton": isLoadingSuggest })}>
                    <div className="avatar" />
                    <div className="info" />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </KsLayout>
  );
};

export default DashBoard;
