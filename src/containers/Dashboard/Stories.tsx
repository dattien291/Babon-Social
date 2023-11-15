import { KaImage } from "@/components/primitive";
import { breakpoints } from "@/utils/constants";
import classNames from "classnames";
import { isEqual, map, times } from "lodash";
import { FC, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import StoriesModal from "./StoriesModal";
import { storyServices } from "@/assets/fake-data/Stories";

const Stories: FC = () => {
  const [stories, setStories] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [storySelected, setStorySelected] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenButtonNavigation, setHiddenButtonNavigation] = useState<"left" | "right" | null>("left");

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      const res = await storyServices.getStories({ page: 1, limit: 1 });
      if (res) setStories(res);
      setIsLoading(false);
    };

    fetchStories();
  }, []);

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = (index: number) => (event: any) => {
    setStorySelected(index);
    setOpenModal(true);
  };

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
                <div className="ks-dashboard-story-item" onClick={handleOpenModal(Number(index) || 0)}>
                  <div className="information">
                    <div className="avatar">
                      <KaImage src={item?.author?.avatar || ""} alt="story-item" objectFit="cover" className="image" draggable="false" />
                    </div>
                    <span className="name">{item?.author?.name}</span>
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
