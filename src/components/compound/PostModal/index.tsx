import { Avatar, KaImage, KaVideo } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { selectUserInfo } from "@/store/auth/selectors";
import { useAppSelector } from "@/store/hooks";
import { Modal } from "@mui/material";
import classNames from "classnames";
import { format, isValid, parseISO } from "date-fns";
import { get, isEmpty, isEqual, map, size } from "lodash";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { GroupInput } from "../GroupInput";

interface IPostModal {
  open: boolean;
  onClose: () => void;
  dataPostModal: any;
}

export const PostModal: FC<IPostModal> = ({ open, onClose, dataPostModal }) => {
  const [hiddenButtonNavigation, setHiddenButtonNavigation] = useState<"left" | "right" | "all" | null>(null);
  const swiperRef: any = useRef(null);
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!open) return;

    if (isEqual(size(dataPostModal?.post?.image), 1)) setHiddenButtonNavigation("all");
    else if (isEqual(dataPostModal?.active, 0)) setHiddenButtonNavigation("left");
  }, [open]);

  const handleSlideChange = (event: any) => {
    if (event?.isBeginning) setHiddenButtonNavigation("left");
    else if (event?.isEnd) setHiddenButtonNavigation("right");
    else setHiddenButtonNavigation(null);
  };

  return (
    <Modal open={open} onClose={onClose} className={classNames("ks-post-modal", { "-dark": theme })}>
      <div className="box">
        <button className="close" onClick={onClose}>
          <i className="icon fa-regular fa-xmark" />
        </button>

        <div className="content">
          <div className="left">
            {!isEmpty(dataPostModal?.post?.image) && (
              <Swiper
                initialSlide={Number(dataPostModal?.active) || 0}
                modules={[Navigation]}
                className="swiper ks-post-modal-slides"
                draggable="false"
                allowTouchMove={false}
                navigation={{
                  nextEl: ".ks-post-modal > .box > .content > .left > .action.-right",
                  prevEl: ".ks-post-modal > .box > .content > .left > .action.-left",
                }}
                onSlideChange={handleSlideChange}
                ref={swiperRef}
              >
                {map(dataPostModal?.post?.image, (src, index) => (
                  <SwiperSlide className="swiper ks-post-modal-slide" key={index}>
                    <div className="thumbnail">
                      <KaImage src={src || ""} objectFit="cover" className="image" draggable="false" />
                      <KaImage src={src || ""} objectFit="cover" className="overlay" draggable="false" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {!isEmpty(dataPostModal?.post?.video) && (
              <KaVideo src={get(dataPostModal?.post?.video, "[0]", "")} className="video" controls />
            )}

            <button
              className={classNames("action -left", {
                "-hidden": isEqual(hiddenButtonNavigation, "left") || isEqual(hiddenButtonNavigation, "all"),
              })}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button
              className={classNames("action -right", {
                "-hidden": isEqual(hiddenButtonNavigation, "right") || isEqual(hiddenButtonNavigation, "all"),
              })}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div className="right">
            <div className="content">
              <div className="header">
                <div className="information">
                  <div className="avatar" onClick={() => navigate(`/profile/${dataPostModal?.post?.username}`)}>
                    <KaImage src={dataPostModal?.post?.author?.avatar || ""} alt="avatar" className="image" objectFit="cover" />
                  </div>

                  <div className="group">
                    <span className="name" onClick={() => navigate(`/profile/${dataPostModal?.post?.username}`)}>
                      {dataPostModal?.post?.author?.name}
                    </span>
                    <span className="date">
                      {isValid(new Date(dataPostModal?.post?.createdAt))
                        ? format(parseISO(dataPostModal?.post?.createdAt), "d MMM, yyyy")
                        : ""}
                      <i className="icon fa-solid fa-earth-americas"></i>
                    </span>
                  </div>
                </div>

                <button className="button">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div className="body">
                <p className="text">{dataPostModal?.post?.text}</p>

                <ul className="ks-post-modal-comments">
                  {map(dataPostModal?.post?.comments, (comment, index) => (
                    <li className="item" key={index}>
                      <div className={classNames("ks-post-modal-comment-card", { "-dark": theme })}>
                        <div className="avatar">
                          <Avatar src={comment?.avatar} objectFit="cover" />
                        </div>

                        <div className="information">
                          <span className="name">{comment?.name}</span>

                          <p className="text">{comment?.text}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="comment">
              <div className="avatar">
                <Avatar src={userInfo?.avatar || ""} objectFit="cover" />
              </div>

              <form className="form">
                <GroupInput type="text" placeholder="Write a comment..." className="group" theme={theme} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
