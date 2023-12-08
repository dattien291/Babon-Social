import { CreatePost, PostList } from "@/components/compound";
import { Avatar, Button, KaLink } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { usePostsInfiniteQuery } from "@/features/posts";
import { useUserQuery } from "@/features/users";
import KsLayout from "@/layout";
import { selectUserInfo } from "@/store/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import classNames from "classnames";
import { flatMap, get, isEqual, last, map, size } from "lodash";
import { FC, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AvatarModal from "./AvatarModal";
import CoverPicture from "./CoverPicture";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const query = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [tab, setTab] = useState<string>("profile");
  const { theme } = useContext(ThemeContext);
  const userInfo = useAppSelector(selectUserInfo);

  const slug = String(query?.slug || "");

  const { data: posts, fetchNextPage, isFetching: isLoadingPosts } = usePostsInfiniteQuery({ username: slug });
  const { data: user, isFetching: isLoadingUser, isError } = useUserQuery({ username: slug });

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  const handleNextPage = () => {
    if (isLoadingPosts) return;
    fetchNextPage();
  };

  return (
    <KsLayout>
      <section>
        <div className={classNames("ks-profile", { "-dark": theme })}>
          <AvatarModal
            open={isOpen}
            onClose={handleCloseModal}
            imageUrl={!isEqual(user?.username, userInfo?.username) ? get(user, "avatar", "") : userInfo?.avatar}
          />

          <div className="cover">
            <KaLink to="/" className="action" color="white">
              <i className="fa-solid fa-chevron-left" />
            </KaLink>

            {!isLoadingUser && (
              <CoverPicture src={get(!isEqual(user?.username, userInfo?.username) ? user : userInfo, "coverPicture", "")} />
            )}
          </div>

          <div className="ks-container wrapper">
            <div className="header heading">
              <div className="group">
                <div className="image" onClick={handleOpenModal}>
                  {!isLoadingUser && (
                    <Avatar
                      src={get(!isEqual(user?.username, userInfo?.username) ? user : userInfo, "avatar", "")}
                      draggable="false"
                      className="avatar"
                      objectFit="cover"
                    />
                  )}
                </div>

                <div className="information">
                  <h3 className="name">{user?.name}</h3>
                  <span className="quantity">{size(get(user, "friends", []))} friends</span>

                  <ul className="ks-profile-list-friends">
                    {map(get(user, "friends", []), (friend, index) => (
                      <li className="item" key={index}>
                        <Avatar src={friend?.avatar || ""} className="avatar" size="sm" draggable="false" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="tabs">
              <Button
                variant="contained"
                color="light"
                size="md"
                className={classNames("button", { "-active": isEqual(tab, "profile") })}
                onClick={() => setTab("profile")}
              >
                Profile
              </Button>

              <Button
                variant="contained"
                color="light"
                size="md"
                className={classNames("button", { "-active": isEqual(tab, "photos") })}
                onClick={() => setTab("photos")}
              >
                Photos
              </Button>
            </div>

            <div className="ks-profile-content">
              <div className="left">
                <CreatePost onSuccess={() => console.log("next-page")} />

                <PostList
                  posts={flatMap(posts?.pages, (item) => item?.data?.items) || []}
                  onNextPage={handleNextPage}
                  hasNextPage={last(posts?.pageParams) !== false}
                />
              </div>

              <div className="right">
                <div className={classNames("suggestion", { "-dark": theme })}>
                  <h4 className="heading">Suggestion 💖💖</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </KsLayout>
  );
};

export default Profile;
