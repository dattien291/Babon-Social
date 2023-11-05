import { map } from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { StoryCard } from "../../compound/StoryCard";
import "./modalstories.scss";
import { Modal } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { breakpoints } from "../../../utils/constants";
import { Navigation } from "swiper";

interface StoriesModalProps {
  open: boolean;
  onClose: () => void;
  active: number;
  dataStories: any;
}

const StoriesModal: FC<StoriesModalProps> = ({ open, onClose, active, dataStories }) => {
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

  const handleActive = (index: number) => {
    if (swiperRef?.current) {
      swiperRef?.current?.swiper?.slideTo(index);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="ks-stories-modal">
      <div className="box">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".ks-story-list > .action.-right",
            prevEl: ".ks-story-list > .action.-left",
          }}
          className=" ks-story-slides swiper"
          slidesPerView={4}
          centeredSlides
          ref={swiperRef}
          allowTouchMove={false}
        >
          {map(dataStories, (story, index) => (
            <SwiperSlide key={index} className="ks-story-slide slide">
              <StoryCard story={story} onClick={() => handleActive(Number(index))} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Modal>
  );
};

export default StoriesModal;
