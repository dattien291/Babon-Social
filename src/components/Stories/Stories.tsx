import React, { useEffect, useRef, useState } from "react";
import "./stories.scss";
import { Story, getStories } from "../../assets/fake-data/ListStories";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { StoriesSkeleton } from "./StoriesSkeleton";
import ModalStories from "./ModalStories/ModalStories";
import ImageBlur from "../ImageBlur/ImageBlur";

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const refStories = useRef<HTMLUListElement>(null);
  const [storiesLoading, setStoriesLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [indexStorySelected, setIndexStorySelected] = useState<number>(0);
  //   const [btnShow, setBtnShow] = useState<boolean>(false);

  useEffect(() => {
    openModal ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
  }, [openModal]);

  useEffect(() => {
    const fetchApiStories = async () => {
      setStoriesLoading(true);
      const res = await getStories();
      setStoriesLoading(false);
      setStories(res);
    };
    fetchApiStories();
  }, []);

  const confirmIndexSeen = (index: number) => {
    setStories((prev) => prev.map((item, index1) => (index === index1 ? { ...item, confirmSeen: true } : item)));
  };

  const handleScrollStoriesNext = () => {
    if (refStories.current) {
      if (refStories.current.scrollLeft < refStories.current.scrollWidth - refStories.current.clientWidth) {
        refStories.current.scrollLeft = refStories.current.scrollLeft + 200;
      } else {
        return;
      }
    }
  };

  const handleScrollStoriesPrev = () => {
    if (refStories.current) {
      if (refStories.current.scrollLeft > 0) {
        refStories.current.scrollLeft = refStories.current.scrollLeft - 200;
      } else {
        return;
      }
    }
  };

  return (
    <div className="wrapper-stories">
      {openModal && (
        <ModalStories
          open={openModal}
          onClose={() => setOpenModal(false)}
          indexStorySelected={indexStorySelected}
          dataStories={stories}
          confirmIndexSeen={confirmIndexSeen}
        />
      )}

      <ul ref={refStories} className="list-stories">
        {storiesLoading ? (
          <StoriesSkeleton />
        ) : (
          stories.map((item, index) => (
            <li
              style={{ borderColor: `${item.confirmSeen ? "rgb(187, 187, 187)" : "rgb(0, 144, 227)"}` }}
              key={item.id}
              onClick={() => {
                setOpenModal(true);
                setIndexStorySelected(index);
              }}
            >
              <div className="information">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    className="avatar-friend"
                    style={{ borderColor: `${item.confirmSeen ? "rgb(187, 187, 187)" : "rgb(0, 144, 227)"}` }}
                  >
                    {item.avatar ? <img src={item.avatar} /> : item.name.slice(0, 2).toLocaleUpperCase()}
                  </div>
                  {item.name}
                </div>
              </div>
              <ImageBlur picture={item.image[0]} />
            </li>
          ))
        )}

        <button className="btn-next" onClick={handleScrollStoriesNext}>
          <RiArrowRightSLine></RiArrowRightSLine>
        </button>
        <button className="btn-prev" onClick={handleScrollStoriesPrev}>
          <RiArrowLeftSLine></RiArrowLeftSLine>
        </button>
      </ul>
    </div>
  );
};

export default Stories;
