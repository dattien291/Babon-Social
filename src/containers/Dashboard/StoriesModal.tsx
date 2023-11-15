import { StoryCard } from "@/components/compound";
import { Modal } from "@mui/material";
import { isEqual, map } from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface IStoriesModalProps {
  open: boolean;
  onClose: () => void;
  active: number;
  dataStories: any;
}

const StoriesModal: FC<IStoriesModalProps> = ({ open, onClose, active, dataStories }) => {
  const swiperRef: any = useRef(null);
  const [hiddenButtonNavigation, setHiddenButtonNavigation] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (open && isEqual(active, 0)) setHiddenButtonNavigation("left");
  }, [open]);

  const handleNext = () => {
    swiperRef?.current?.swiper?.slideNext();
  };

  const handlePrev = () => {
    swiperRef?.current?.swiper?.slidePrev();
  };

  useEffect(() => {
    const handleAction = (event: KeyboardEvent) => {
      if (!swiperRef?.current) return;
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    };

    open && document.addEventListener("keyup", handleAction);

    return () => document.removeEventListener("keyup", handleAction);
  }, [open]);

  const handleActive = (index: number) => {
    swiperRef?.current?.swiper?.slideTo(index);
  };

  const handleSlideChange = (event: any) => {
    if (event?.isBeginning) setHiddenButtonNavigation("left");
    else if (event?.isEnd) setHiddenButtonNavigation("right");
    else setHiddenButtonNavigation(null);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="ks-stories-modal"
      classes={{ root: "ks-stories-modal-root", backdrop: "ks-stories-modal-backdrop" }}
    >
      <div className="box">
        <Swiper
          initialSlide={Number(active)}
          modules={[Navigation]}
          className="ks-story-slides swiper"
          slidesPerView={"auto"}
          centeredSlides
          ref={swiperRef}
          allowTouchMove={false}
          speed={500}
          onSlideChange={handleSlideChange}
        >
          {map(dataStories, (story, index) => (
            <SwiperSlide key={index} className="ks-story-slide slide" style={{ width: "375px" }}>
              <StoryCard
                story={story}
                onClick={() => handleActive(Number(index))}
                isBeginning={isEqual(hiddenButtonNavigation, "left")}
                isEnd={isEqual(hiddenButtonNavigation, "right")}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Modal>
  );
};

export default StoriesModal;
