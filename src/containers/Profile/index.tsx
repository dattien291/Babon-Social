import { useState, useEffect, useRef, useContext, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import getRoundedCanvas from "@/utils/Cropper";
import { ThemeContext } from "@/contexts/Theme";
import { flatMap, flatMapDepth, get, isEmpty, isEqual, map, size, slice } from "lodash";
import { Avatar, Button } from "@/components/primitive";
import classNames from "classnames";
import { CreatePost, PostList } from "@/components/compound";
import CoverPicture from "./CoverPicture";
import { useAppDispatch } from "@/store/hooks";
import { usePostsInfiniteQuery, usePostsQuery } from "@/features/posts";
import { useInView } from "react-intersection-observer";
import { useUsersQuery } from "@/features/users";
import KsLayout from "@/layout";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const query = useParams();
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const refImageEdit = useRef<HTMLImageElement>(null);

  const { ref: seeMoreRef, inView } = useInView();

  let cropper: any = null;
  const [tab, setTab] = useState<string>("profile");
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);

  const slug = String(query?.slug || "");

  const { data: posts, fetchNextPage, isFetching: isLoadingPosts } = usePostsInfiniteQuery({ username: slug });
  const { data: users, isFetching: isLoadingUsers } = useUsersQuery({ username: slug });

  useEffect(() => {
    if (inView && !isLoadingPosts) fetchNextPage();
  }, [inView]);

  // useEffect(() => {
  //   if (!previewInModal) return;

  //   if (refImageEdit.current) {
  //     cropper = new Cropper(refImageEdit.current, {
  //       aspectRatio: 1 / 1,
  //       autoCropArea: 1,
  //       viewMode: 1,
  //     });
  //   }
  // }, [previewInModal]);

  // const handleOnChangeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   file && setPreviewInModal(URL.createObjectURL(file));
  // };

  // const handleSubmitInfo = async () => {
  //   if (previewInModal) {
  //     const croppedCanvas = cropper?.getCroppedCanvas();
  //     const roundedCanvas = getRoundedCanvas(croppedCanvas).toDataURL();
  //     await updateAvatar(stateUserProfile.id, roundedCanvas); //update in DB
  //     setStateUserProfile({ ...stateUserProfile, avatar: roundedCanvas }); //update in state local

  //     dispatch(updateInfo({ avatar: roundedCanvas })); // update User Redux is logging
  //   }
  //   setIsModalOpen(false);
  // };

  return (
    <KsLayout>
      <section>
        <div className="ks-profile">
          <div className="cover">
            {!isLoadingUsers && <CoverPicture src={!isEmpty(users) && get(users, "[0].coverPicture", "/coverimageprofile.jpg")} />}
          </div>

          <div className="ks-container wrapper">
            <div className="header">
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

              <div className="right">Right</div>
            </div>
          </div>
        </div>
      </section>
    </KsLayout>
  );
};

export default Profile;
