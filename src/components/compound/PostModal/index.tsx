import { Avatar, KaImage } from "@/components/primitive";
import { Modal } from "@mui/material";
import classNames from "classnames";
import { isEmpty, isEqual, map, size } from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { GroupInput } from "../GroupInput";
import { selectUserInfo } from "@/store/auth/selectors";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { format, isValid, parseISO } from "date-fns";

interface IPostModal {
  open: boolean;
  onClose: () => void;
  dataPostModal: any;
}

export const PostModal: FC<IPostModal> = ({ open, onClose, dataPostModal }) => {
  const [hiddenButtonNavigation, setHiddenButtonNavigation] = useState<"left" | "right" | null>("left");
  const swiperRef: any = useRef(null);
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      swiperRef?.current?.swiper?.slideTo(Number(dataPostModal?.active) || 0);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const handleToggleButtonNavigation = (event: any) => {
    if (event?.isBeginning) setHiddenButtonNavigation("left");
    else if (event?.isEnd) setHiddenButtonNavigation("right");
    else setHiddenButtonNavigation(null);
  };

  return (
    <Modal open={open} onClose={onClose} className="ks-post-modal">
      <div className="box">
        <button className="close" onClick={onClose}>
          <i className="icon fa-regular fa-xmark" />
        </button>

        <div className="content">
          <div className="left">
            <Swiper
              modules={[Navigation]}
              className="swiper ks-post-modal-slides"
              draggable="false"
              allowTouchMove={false}
              navigation={{
                nextEl: ".ks-post-modal > .box > .content > .left > .action.-right",
                prevEl: ".ks-post-modal > .box > .content > .left > .action.-left",
              }}
              onActiveIndexChange={handleToggleButtonNavigation}
              ref={swiperRef}
            >
              {!isEmpty(dataPostModal?.post?.image) &&
                map(dataPostModal?.post?.image, (src, index) => (
                  <SwiperSlide className="swiper ks-post-modal-slide" key={index}>
                    <div className="thumbnail">
                      <KaImage src={src || ""} objectFit="cover" className="image" draggable="false" />
                      <KaImage src={src || ""} objectFit="cover" className="overlay" draggable="false" />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            <button className={classNames("action -left", { "-hidden": isEqual(hiddenButtonNavigation, "left") })}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button className={classNames("action -right", { "-hidden": isEqual(hiddenButtonNavigation, "right") })}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div className="right">
            <div className="content">
              <div className="header">
                <div className="information">
                  <div className="avatar" onClick={() => navigate(`/profile/${dataPostModal?.post?.username}`)}>
                    <KaImage src={dataPostModal?.post?.avatar || ""} alt="avatar" className="image" objectFit="cover" />
                  </div>

                  <div className="group">
                    <span className="name" onClick={() => navigate(`/profile/${dataPostModal?.post?.username}`)}>
                      {dataPostModal?.post?.name}
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
                      <div className="ks-post-modal-comment-card">
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
                <GroupInput type="text" placeholder="Write a comment..." className="group" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
