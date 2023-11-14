import { Modal } from "@mui/material";
import { map } from "lodash";
import { FC, useRef, useState, useEffect } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { StoryCard } from "@/components/compound";
import classNames from "classnames";
import { breakpoints } from "@/utils/constants";

interface IStoriesModalProps {
  open: boolean;
  onClose: () => void;
  active: number;
  dataStories: any;
}

const StoriesModal: FC<IStoriesModalProps> = ({ open, onClose, active, dataStories }) => {
  const [index, setIndex] = useState<number>(-1);
  const [timePause, setTimePause] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoStart, setVideoStart] = useState<boolean>(false);
  const swiperRef: any = useRef(null);

  // useEffect(() => {
  //   if (audioRef.current && open) {
  //     timePause ? audioRef.current.pause() : audioRef.current.play();
  //     audioRef.current.muted = mute;
  //   } else if (videoRef.current && open) {
  //     timePause ? videoRef.current.pause() : videoRef.current.play();
  //     videoRef.current.muted = mute;
  //   }
  // }, [timePause, mute]);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      swiperRef?.current?.swiper?.slideTo(active);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const handleActive = (index: number) => {
    swiperRef?.current?.swiper?.slideTo(index);
  };

  const handleNext = () => {
    swiperRef?.current?.swiper?.slideNext();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classNames("ks-stories-modal")}
      classes={{ root: "ks-stories-modal-root", backdrop: "ks-stories-modal-backdrop" }}
    >
      <div className="box">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".ks-story-list > .action.-right",
            prevEl: ".ks-story-list > .action.-left",
          }}
          className="ks-story-slides swiper"
          slidesPerView={"auto"}
          centeredSlides
          ref={swiperRef}
          allowTouchMove={false}
          speed={500}
        >
          {map(dataStories, (story, index) => (
            <SwiperSlide key={index} className="ks-story-slide slide" style={{ width: "375px" }}>
              <StoryCard story={story} onClick={() => handleActive(Number(index))} onNext={handleNext} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Modal>
  );
};

export default StoriesModal;
