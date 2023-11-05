import { map, times } from "lodash";
import React, { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getStories } from "../../assets/fake-data/ListStories";
import { KaImage } from "../primitive/KaImage";
import StoriesModal from "./ModalStories/StoriesModal";
import "./stories.scss";
import { Skeleton } from "@mui/material";

const Stories: React.FC = () => {
  const [stories, setStories] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [storySelected, setStorySelected] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      const res = await getStories();
      setStories(res);
      setIsLoading(false);
    };

    fetchStories();
  }, []);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="ks-story-list">
      <StoriesModal open={openModal} onClose={handleCloseModal} active={storySelected} dataStories={stories} />

      <Swiper
        slidesPerView={"auto"}
        navigation={{
          nextEl: ".ks-story-list > .action.-right",
          prevEl: ".ks-story-list > .action.-left",
        }}
        spaceBetween={20}
        modules={[Navigation]}
        className="swiper"
      >
        {!isLoading
          ? map(stories, (item, index) => (
              <SwiperSlide key={index} className="slide" style={{ width: "130px" }}>
                <div
                  className="ks-story-item"
                  onClick={() => {
                    setOpenModal(true);
                    setStorySelected(Number(index));
                  }}
                >
                  <div className="information">
                    <KaImage src={item?.avatar || ""} alt={item?.avatar} objectFit="cover" className="avatar" />
                    {item.name}
                  </div>

                  <KaImage src={item?.image[0]?.url || ""} objectFit="cover" />
                </div>
              </SwiperSlide>
            ))
          : times(10, (index) => (
              <SwiperSlide key={index} className="slide" style={{ width: "130px" }}>
                <div className="ks-story-item">
                  <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>

      <button className="action -right">
        <RiArrowRightSLine></RiArrowRightSLine>
      </button>

      <button className="action -left">
        <RiArrowLeftSLine></RiArrowLeftSLine>
      </button>
    </div>
  );
};

export default Stories;
