import React, { useState, useEffect, useContext } from "react";
import "./modalpreview.scss";
import { DataModalPreview } from "../ListPosts";
import { RiZoomInLine, RiZoomOutLine, RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine, RiEarthFill } from "react-icons/ri";
import EmojiFly from "./EmojiFly";
import { Comment } from "../../../assets/fake-data/Posts";
import Comments from "./Comments";
import FormatDate from "../../../utils/FormatDate";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import useNavigateLocal from "../../../hooks/useNavigateLocal";
import { ThemeContext } from "../../../contexts/Theme";

interface ModalPreviewProps {
  open: boolean;
  setOpenModalPreview: React.Dispatch<React.SetStateAction<boolean>>;
  dataModalPreview: DataModalPreview;
}

const ModalPreview: React.FC<ModalPreviewProps> = ({ open, setOpenModalPreview, dataModalPreview }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigateLocal();
  const dataUser = useSelector((state: RootState) => state.auth);
  const [index, setIndex] = useState<number>(0);
  const [scale, setScale] = useState<number>(0);
  const [showMoreText, setShowMoreText] = useState<boolean>(false);
  const [listComments, setListComments] = useState<Comment[]>([]);
  const [checkNewComment, setCheckNewComment] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    dataModalPreview.post.comment && setListComments(dataModalPreview.post.comment);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    dataModalPreview.index ? setIndex(dataModalPreview.index) : setIndex(0);
  }, [open, dataModalPreview.post.image]);

  const onSubmitComment = (text: string) => {
    setListComments([
      {
        id: "n",
        user: dataUser.dataUser.name,
        text: text,
        image: "",
        createAt: FormatDate(),
        avatar: dataUser.dataUser.avatar,
      },
      ...listComments,
    ]);
    setCheckNewComment(true);
  };

  const handNavigateProfile = (username: string) => {
    navigate.directional("/profile", { isMyProfile: false, dataProfile: username });
  };

  //   setImageSelected();

  return (
    <div className={`modal-preview-photos ${open ? "modal-preview-show" : ""}`}>
      <div className="album-in-modal">
        <button onClick={() => index > 0 && setIndex((prev) => prev - 1)} className="btn-prev">
          <RiArrowLeftSLine></RiArrowLeftSLine>
        </button>
        <button
          onClick={() => index < dataModalPreview.post.image.length - 1 && setIndex((prev) => prev + 1)}
          className="btn-next"
        >
          <RiArrowRightSLine></RiArrowRightSLine>
        </button>
        <div className="image-preview">
          {dataModalPreview.post.video && (
            <video src={dataModalPreview.post.video[0]} controls autoPlay style={{ width: "100%", height: "100%" }}></video>
          )}
          {dataModalPreview.post.image.length > 0 && (
            <img src={dataModalPreview.post.image[index].url} alt="" style={{ transform: `scale(1.${scale})` }} />
          )}
        </div>
        <div className="zoom-group">
          <span
            style={{ cursor: `${scale < 6 ? "pointer" : "no-drop"}`, opacity: `${scale < 6 ? "1" : "0.3"}` }}
            onClick={() => scale < 6 && setScale((prev) => prev + 1)}
          >
            <RiZoomInLine></RiZoomInLine>
          </span>
          <span
            style={{ cursor: `${scale > 0 ? "pointer" : "no-drop"}`, opacity: `${scale > 0 ? "1" : "0.3"}` }}
            onClick={() => scale > 0 && setScale((prev) => prev - 1)}
          >
            <RiZoomOutLine></RiZoomOutLine>
          </span>
          <div className="btn-close-modal">
            <button onClick={() => setOpenModalPreview(false)}>
              <RiCloseLine></RiCloseLine>
            </button>
          </div>
        </div>
      </div>

      <div className={`list-comment ${theme ? "dark" : ""}`}>
        <div className="wrapper-comment-scroll">
          <div style={{ padding: "10px" }}>
            <div className="infomation-post">
              <div className="post-item-header">
                <div className="friend-info">
                  <div className="avatar-friend" onClick={() => handNavigateProfile(dataModalPreview.post.username)}>
                    {dataModalPreview.post.avatar ? (
                      <img src={dataModalPreview.post.avatar} />
                    ) : (
                      dataModalPreview.post.name.slice(0, 2).toLocaleUpperCase()
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <span className="name" onClick={() => handNavigateProfile(dataModalPreview.post.username)}>
                      {dataModalPreview.post.name}
                    </span>
                    <span className="create-at">
                      {dataModalPreview.post.createAt} <RiEarthFill></RiEarthFill>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "14px",
                maxHeight: `${!showMoreText ? "55px" : ""}`,
                overflow: "hidden",
              }}
            >
              {dataModalPreview.post.text}
            </div>
            {!showMoreText && (
              <span onClick={() => setShowMoreText(true)} style={{ fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                ...See more
              </span>
            )}
          </div>
          <div
            className={checkNewComment ? "have-newcm" : ""}
            style={{ borderTop: "1px solid rgb(208, 208, 208)", marginTop: "15px" }}
          >
            {listComments.length > 0 &&
              listComments.map((item, index) => (
                <div key={index} className="comment">
                  <div className="avatar-friend" style={{ color: "black" }}>
                    {item.avatar ? <img src={item.avatar} /> : item.user.slice(0, 2).toLocaleUpperCase()}
                  </div>
                  <div>
                    <div className="text">
                      <span style={{ fontWeight: "500" }}>{item.user}</span>
                      <span style={{ fontSize: "15px" }}>{item.text}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "13px" }}>{item.createAt}</span>
                      <span style={{ fontSize: "13px", color: "", marginLeft: "5px", cursor: "pointer", fontWeight: "600" }}>
                        Like
                      </span>
                      <span style={{ fontSize: "13px", color: "", marginLeft: "5px", cursor: "pointer", fontWeight: "600" }}>
                        Reply
                      </span>
                    </div>

                    {item.reply && (
                      <span style={{ fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        <span style={{ fontSize: "20px", fontWeight: "600" }}>⤷ </span> {item.reply.length} Reply...
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <EmojiFly />
        <Comments onSubmitComment={onSubmitComment} />
      </div>
    </div>
  );
};

export default ModalPreview;
