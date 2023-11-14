import { Skeleton } from "@mui/material";
import { isEqual, map, times } from "lodash";
import React, { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getStories } from "@/assets/fake-data/Stories";
import { KaImage } from "@/components/primitive";
import StoriesModal from "./StoriesModal";
import classNames from "classnames";
import { breakpoints } from "@/utils/constants";

const Stories: React.FC = () => {
  const [stories, setStories] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [storySelected, setStorySelected] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenButtonNavigation, setHiddenButtonNavigation] = useState<"left" | "right" | null>("left");

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      const res = await getStories();
      if (res) setStories(res);
      setIsLoading(false);
    };

    fetchStories();
  }, []);

  const handleCloseModal = () => setOpenModal(false);

  const handleToggleButtonNavigation = (event: any) => {
    if (event?.isBeginning) setHiddenButtonNavigation("left");
    else if (event?.isEnd) setHiddenButtonNavigation("right");
    else setHiddenButtonNavigation(null);
  };

  return (
    <div className="ks-dashboard-story-list">
      <StoriesModal open={openModal} onClose={handleCloseModal} active={storySelected} dataStories={stories} />

      <Swiper
        slidesPerView={"auto"}
        navigation={{
          nextEl: ".ks-dashboard-story-list > .action.-right",
          prevEl: ".ks-dashboard-story-list > .action.-left",
        }}
        modules={[Navigation]}
        className="swiper"
        onActiveIndexChange={handleToggleButtonNavigation}
        draggable="false"
        breakpoints={{
          [breakpoints.lg]: {
            spaceBetween: 20,
            allowTouchMove: false,
          },
          [breakpoints.sm]: {
            spaceBetween: 15,
            allowTouchMove: true,
          },
          [breakpoints.xs]: {
            spaceBetween: 10,
            allowTouchMove: true,
          },
        }}
      >
        {!isLoading
          ? map(stories, (item, index) => (
              <SwiperSlide key={index} className="slide" style={{ width: "130px" }}>
                <div
                  className="ks-dashboard-story-item"
                  onClick={() => {
                    setStorySelected(Number(index));
                    setOpenModal(true);
                  }}
                >
                  <div className="information">
                    <KaImage src={item?.avatar || ""} alt={item?.avatar || ""} objectFit="cover" className="avatar" />
                    {item.name}
                  </div>

                  <KaImage src={item?.image || ""} objectFit="cover" draggable="false" />
                </div>
              </SwiperSlide>
            ))
          : times(10, (index) => (
              <SwiperSlide key={index} className="slide" style={{ width: "130px" }}>
                <div className="ks-dashboard-story-item">
                  <div className="skeleton" />
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
  );
};

export default Stories;
