import { KaImage } from "@/components/primitive";
import { useAppDispatch } from "@/store/hooks";
import classNames from "classnames";
import { format, isValid, parseISO } from "date-fns";
import { get, isEmpty, isEqual, map, size, slice } from "lodash";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostModal } from "@/components/compound/PostModal";
import { ThemeContext } from "@/contexts/Theme";

interface IListPostsProps {
  posts: any;
  onNextPage: () => void;
  hasNextPage?: boolean;
}

export const PostList: FC<IListPostsProps> = ({ posts, onNextPage, hasNextPage }) => {
  const dispatch = useAppDispatch();
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [dataPostModal, setDataPostModal] = useState<any>();
  const [postVideoPlaying, setPostVideoPlaying] = useState<string>("");
  const { theme } = useContext(ThemeContext);

  const videoRef: any = useRef(null);
  const { ref, inView } = useInView();
  const { ref: seeMoreRef, inView: inViewLoadMore } = useInView();

  useEffect(() => {
    document.pictureInPictureElement && document.exitPictureInPicture();
  }, [postVideoPlaying]);

  useEffect(() => {
    if (!inView) videoRef?.current?.requestPictureInPicture();
  }, [inView]);

  const handleOpenModal =
    ({ active, post }: any) =>
    (event: any) => {
      setDataPostModal({ active, post });
      setIsOpenModal(true);
    };

  const handleCloseModal = () => setIsOpenModal(false);

  useEffect(() => {
    if (inViewLoadMore) onNextPage();
  }, [inViewLoadMore]);

  return (
    <div className="ks-posts">
      <PostModal open={isOpenModal} onClose={handleCloseModal} dataPostModal={dataPostModal} />

      {map(posts, (item, index) => (
        <div key={index} className={classNames("ks-post-card", { "-dark": theme })}>
          <div className="header">
            <div className="information">
              <div className="avatar" onClick={() => navigate(`/profile/${item?.username}`)}>
                <KaImage
                  src={isEqual(item?.username, userInfo?.username) ? userInfo?.avatar : item?.author?.avatar}
                  alt="avatar"
                  className="image"
                  objectFit="cover"
                />
              </div>

              <div className="group">
                <span className="name" onClick={() => navigate(`/profile/${item?.username}`)}>
                  {item?.author?.name || ""}
                </span>
                <span className="date">
                  {isValid(new Date(item?.createdAt)) ? format(parseISO(item?.createdAt), "d MMM, yyyy") : ""}
                  <i className="icon fa-solid fa-earth-americas"></i>
                </span>
              </div>
            </div>

            <button className="button">
              <i className="fa-solid fa-ellipsis"></i>
            </button>
          </div>

          <div className="body">
            <p className="text">{item?.text}</p>

            <div className="meta">
              {!isEmpty(item?.video) && (
                <div className="video" ref={isEqual(postVideoPlaying, item?.id) ? ref : null}>
                  <video
                    onPlay={() => {
                      setPostVideoPlaying(item?.id);
                    }}
                    onPause={() => {
                      document?.pictureInPictureElement && document?.exitPictureInPicture();
                      setPostVideoPlaying("");
                    }}
                    controls
                    src={get(item?.video, "[0]", "")}
                    className="video"
                    width="100%"
                    height="100%"
                    ref={isEqual(postVideoPlaying, item?.id) ? videoRef : null}
                  />
                </div>
              )}

              {!isEmpty(item?.image) && (
                <ul
                  className={classNames(
                    "ks-post-card-images",
                    { "ks-post-card-images-default": size(item?.image) > 5 },
                    { "ks-post-card-images-1": size(item?.image) === 1 },
                    { "ks-post-card-images-2": size(item?.image) === 2 },
                    { "ks-post-card-images-3": size(item?.image) === 3 },
                    { "ks-post-card-images-4": size(item?.image) === 4 },
                    { "ks-post-card-images-5": size(item?.image) === 5 }
                  )}
                >
                  {map(slice(item?.image), (src: string, index: number) => (
                    <li key={index} className="item" onClick={handleOpenModal({ active: index, post: item })}>
                      <KaImage src={src || ""} alt="image" objectFit="cover" draggable="false" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="footer">
            <div className="option">
              <i className="icon fa-regular fa-heart" />
              {item?.likeCount} Likes
            </div>
            <div className="option" onClick={handleOpenModal({ active: 0, post: item })}>
              <i className="icon fa-light fa-comment" /> Comments
            </div>
            <div className="option">
              <i className="icon fa-regular fa-share" /> Shares
            </div>
          </div>
        </div>
      ))}

      {hasNextPage && (
        <div className={classNames("ks-post-card", { "-dark": theme })} ref={seeMoreRef}>
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
      )}
    </div>
  );
};
