import { FC, useEffect, useRef, useState } from "react";
import { useSwiperSlide } from "swiper/react";

import classNames from "classnames";
import { KaImage, KaVideo } from "@/components/primitive";
import { isEmpty } from "lodash";
import Progress from "./Progress";
import { CircularProgress } from "@mui/material";

interface IStoryCardProps {
  story: any;
  onClick: () => void;
  onNext: () => void;
}

export const StoryCard: FC<IStoryCardProps> = ({ story, onClick, onNext }) => {
  const swiperSlide = useSwiperSlide();
  const [metadata, setMetadata] = useState<any>({
    isLoading: true,
    duration: 0,
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
        <KaImage src={story?.image || ""} objectFit="cover" className={classNames("image", { "-active": swiperSlide?.isActive })} />
      </div>

      {swiperSlide?.isActive && <Progress onNext={onNext} playing={isPlaying} metadata={metadata} />}

      {swiperSlide.isActive && (
        <KaVideo
          src={story?.video || ""}
          width="100%"
          height="100%"
          className={classNames("video", { "-hidden": metadata.isLoading })}
          autoPlay
          onLoadedMetadata={(event: any) => setMetadata({ isLoading: false, duration: Number(event?.target?.duration) || 0 })}
          onPlaying={(event: any) => setIsPlaying(true)}
        />
      )}

      {swiperSlide.isActive && metadata.isLoading && (
        <div className={classNames("video", { "-loading": metadata.isLoading })}>
          <CircularProgress color="secondary" className="spinner" />
        </div>
      )}

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
      {/* {swiperSlide.isActive && <video src={story?.video || ""} autoPlay width="100%" height="100%" className="video" ref={videoRef} />} */}

      {/* {story?.video && !story?.image && !story?.audio && <video id="videoStory" autoPlay src={story.video} />}

        {!story?.video && story?.image && !story?.audio && (
          <KaImage src={story?.image[0]?.url || ""} draggable="false" objectFit="cover" />
        )}

        {!story?.video && !story?.image && story?.audio && <audio autoPlay src={story.audio} />} */}
    </div>
  );
};
