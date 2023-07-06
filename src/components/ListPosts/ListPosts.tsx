import React, { useContext, useEffect, useRef, useState } from "react";
import { RiMoreLine, RiEarthFill } from "react-icons/ri";
import { Post } from "../../assets/fake-data/Posts";
import "./listposts.scss";
import ModalPreview from "./ModalPreview/ModalPreview";
import ImageBlur from "../ImageBlur/ImageBlur";
import useNavigateLocal from "../../hooks/useNavigateLocal";
import { ThemeContext } from "../../contexts/Theme";
import { useDispatch, useSelector } from "react-redux";
import { postLike } from "../../store/listPostsSlice";
import { RootState } from "../../store/store";

interface ListPostsProps {}

export interface DataModalPreview {
  index?: number;
  post: Post;
}

const ListPosts: React.FC<ListPostsProps> = () => {
  const dispath = useDispatch();
  const listPosts = useSelector((state: RootState) => state.posts.listPosts);
  const dataUser = useSelector((state: RootState) => state.auth.dataUser);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigateLocal();
  const [openModalPreview, setOpenModalPreview] = useState<boolean>(false);
  const [dataModalPreview, setDataModalPreview] = useState<DataModalPreview>();
  const [postVideoPlaying, setPostVideoPlaying] = useState<string>("");
  const playingVideoRef = useRef<HTMLVideoElement>(null);
  let videoPlayHistory = useRef<any>(null);

  useEffect(() => {
    // listPostsIsMounted.current = true;
    return () => {
      videoPlayHistory.current && videoPlayHistory.current.pause();
      document.pictureInPictureElement && document.exitPictureInPicture();
    };
  }, []);

  useEffect(() => {
    if (videoPlayHistory.current || openModalPreview) {
      if (videoPlayHistory.current) {
        document.pictureInPictureElement && document.exitPictureInPicture();
        videoPlayHistory.current.pause();
      }
    }

    if (playingVideoRef.current) {
      videoPlayHistory.current = playingVideoRef.current;
    }
  }, [postVideoPlaying, openModalPreview]);

  useEffect(() => {
    if (playingVideoRef.current) {
      let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
        } else {
          if (
            document.pictureInPictureEnabled &&
            !playingVideoRef.current?.disablePictureInPicture &&
            !playingVideoRef.current?.paused
          ) {
            try {
              playingVideoRef.current && playingVideoRef.current.requestPictureInPicture();
            } catch (err) {
              console.error(err);
            }
          }
          // playingVideoRef.current?.requestPictureInPicture();
        }
      });
      observer.observe(playingVideoRef.current);
    }
  }, [postVideoPlaying]);

  const handleNavigateProfile = (username: string) => {
    navigate.directional("/profile", { isMyProfile: false, dataProfile: username });
  };

  return (
    <>
      <div className="list-posts">
        {openModalPreview && (
          <ModalPreview
            open={openModalPreview}
            setOpenModalPreview={setOpenModalPreview}
            dataModalPreview={dataModalPreview as DataModalPreview}
          />
        )}
        {listPosts.map((item) => (
          <div key={item.id} className={`post-item ${theme && "dark"}`}>
            <div className="post-item-header">
              <div className="friend-info">
                <div className="avatar-friend" onClick={() => handleNavigateProfile(item.username)}>
                  {item.username === dataUser.username &&
                    (dataUser.avatar ? <img src={dataUser.avatar} /> : dataUser.name.slice(0, 2).toLocaleUpperCase())}
                  {item.username !== dataUser.username &&
                    (item.avatar ? <img src={item.avatar} /> : item.name.slice(0, 2).toUpperCase())}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <span className="name" onClick={() => handleNavigateProfile(item.username)}>
                    {item.name}
                  </span>
                  <span className="create-at">
                    {item.createAt} <RiEarthFill></RiEarthFill>
                  </span>
                </div>
              </div>
              <button className="options" style={{ backgroundColor: "transparent", color: `${theme ? "white" : "black"}` }}>
                <RiMoreLine></RiMoreLine>
              </button>
            </div>

            <div className="post-item-body">
              <span>{item.text}</span>
              {item.video && (
                <div className="post-video">
                  <div className="post-video-group">
                    <div
                      className="post-video-preview"
                      onClick={() => {
                        setOpenModalPreview(true);
                        setDataModalPreview({
                          index: 0,
                          post: item,
                        });
                      }}
                    ></div>
                    <video
                      onPlay={() => {
                        setPostVideoPlaying(item.id);
                      }}
                      onPause={() => {
                        document.pictureInPictureElement && document.exitPictureInPicture();
                      }}
                      controls
                      ref={postVideoPlaying === item.id ? playingVideoRef : null}
                      src={item.video[0]}
                      style={{ cursor: "pointer", width: "100%", maxHeight: "100%" }}
                    ></video>
                  </div>
                </div>
              )}
              {item.image.length > 0 && (
                <ul className={item.image.length < 5 ? `list-image-post-${item.image.length}` : "list-image-post-default"}>
                  {item.image.map(
                    (item1, index) =>
                      index < 4 && (
                        <li
                          key={index}
                          onClick={() => {
                            setOpenModalPreview(true);
                            setDataModalPreview({
                              index: index,
                              post: item,
                            });
                          }}
                        >
                          <ImageBlur picture={item1} />
                          {/* <img src={item1} alt="" className="image-in-post" /> */}
                        </li>
                      )
                  )}
                  {item.image.length > 4 && (
                    <li
                      onClick={() => {
                        setOpenModalPreview(true);
                        setDataModalPreview({
                          index: 4,
                          post: item,
                        });
                      }}
                    >
                      <span className="post-image-count">{`+${item.image.length - 4}`}</span>
                      <ImageBlur picture={item.image[4]} />
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className="post-item-footer">
              <div className="options" onClick={() => dispath(postLike(item.id))}>
                {item.like ? (
                  <img src="/heart-purple.svg" alt="" width={"20px"} className="heart-purple" />
                ) : (
                  <img src="/heart-line.svg" alt="" width={"20px"} />
                )}
                {item.likeCount} Likes
              </div>
              <div
                className="options"
                onClick={() => {
                  setOpenModalPreview(true);
                  setDataModalPreview({
                    index: 0,
                    post: item,
                  });
                }}
              >
                <img src="/comment-icon.svg" alt="" width={"20px"} /> Comments
              </div>
              <div className="options">
                <img src="/share.svg" alt="" width={"16px"} /> Shares
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListPosts;
