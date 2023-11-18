import { CreatePost, PostList } from "@/components/compound";
import { Avatar, Button, KaLink } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { usePostsInfiniteQuery } from "@/features/posts";
import { useUsersQuery } from "@/features/users";
import KsLayout from "@/layout";
import { useAppDispatch } from "@/store/hooks";
import classNames from "classnames";
import { flatMap, get, isEmpty, isEqual, map, size } from "lodash";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CoverPicture from "./CoverPicture";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const query = useParams();

  const { ref: seeMoreRef, inView } = useInView();
  const [tab, setTab] = useState<string>("profile");
  const { theme } = useContext(ThemeContext);
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);

  const slug = String(query?.slug || "");

  const { data: posts, fetchNextPage, isFetching: isLoadingPosts } = usePostsInfiniteQuery({ username: slug });
  const { data: users, isFetching: isLoadingUsers } = useUsersQuery({ username: slug });

  useEffect(() => {
    if (inView && !isLoadingPosts) fetchNextPage();
  }, [inView]);

  return (
    <KsLayout>
      <section>
        <div className={classNames("ks-profile", { "-dark": theme })}>
          <div className="cover">
            <KaLink to="/" className="action" color="white">
              <i className="fa-solid fa-chevron-left" />
            </KaLink>
            {!isLoadingUsers && (
              <CoverPicture
                src={
                  !isEmpty(users) && !isEqual(get(users, "[0].username", ""), userInfo?.username)
                    ? get(users, "[0].coverPicture", "/coverimageprofile.jpg")
                    : get(userInfo, "coverPicture", "/coverimageprofile.jpg")
                }
              />
            )}
          </div>

          <div className="ks-container wrapper">
            <div className="header heading">
              <div className="group">
                <div className="image">
                  {!isLoadingUsers && (
                    <Avatar src={!isEmpty(users) && get(users, "[0].avatar", "")} draggable="false" className="avatar" objectFit="cover" />
                  )}
                </div>

                <div className="information">
                  <h3 className="name">{!isEmpty(users) && get(users, "[0].name", "")}</h3>
                  <span className="quantity">{!isEmpty(users) && size(get(users, "[0].friends", []))} friends</span>

                  <ul className="ks-profile-list-friends">
                    {!isEmpty(users) &&
                      map(get(users, "[0].friends", []), (friend, index) => (
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
