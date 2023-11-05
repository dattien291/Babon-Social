import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import { useSwiperSlide } from "swiper/react";
import { FC } from "react";
import { KaImage } from "../../primitive/KaImage";
import classNames from "classnames";

interface IStoryCardProps {
  story: any;
  onClick: () => void;
}

export const StoryCard: FC<IStoryCardProps> = ({ story, onClick }) => {
  const swiperSlide = useSwiperSlide();

  return (
    <div
      className={classNames(
        "ks-story-card",
        { "-active": swiperSlide.isActive },
        { "-next": swiperSlide.isNext },
        { "-prev": swiperSlide.isPrev }
      )}
      onClick={onClick}
    >
      <div className="blur">
        <KaImage src={story?.image[0]?.url} objectFit="cover" className="image" />
      </div>

      {/* {index === parseInt(story.id) - 1 && open ? (
          <TimeNext
            timePause={timePause}
            open={open}
            handleNextStory={handleNextStory}
            videoDuration={videoDuration}
            videoStart={videoStart}
          />
        ) : (
          <></>
        )} */}
      {/* <div className="information">
            <div className="avatar-friend">
              <img src={story?.avatar} />
            </div>
            <span>{story.name}</span>
          </div> */}

      {/* <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setTimePause((prev) => !prev)}>
              {timePause ? <RiPlayFill></RiPlayFill> : <span className="btn-pause"></span>}
            </button>
            <button onClick={() => setMute((prev) => !prev)}>
              {mute ? <RiVolumeMuteFill></RiVolumeMuteFill> : <RiVolumeUpFill></RiVolumeUpFill>}
            </button>
            <button>
              <RiMoreFill></RiMoreFill>
            </button>
          </div> */}

      {/* {index + 1 === parseInt(story.id) && <StoryComment />} */}
      {story?.image && <KaImage src={story?.image[0]?.url || ""} draggable="false" objectFit="contain" className="image" />}

      {/* {story?.video && !story?.image && !story?.audio && <video id="videoStory" autoPlay src={story.video} />}

        {!story?.video && story?.image && !story?.audio && (
          <KaImage src={story?.image[0]?.url || ""} draggable="false" objectFit="cover" />
        )}

        {!story?.video && !story?.image && story?.audio && <audio autoPlay src={story.audio} />} */}
    </div>
  );
};
