import { FC, useContext, useEffect, useRef, useState } from "react";
import { useSwiperSlide } from "swiper/react";
import { Avatar, KaImage, KaVideo } from "@/components/primitive";
import { $ } from "@/utils/constants";
import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import { get, isEqual, size, times } from "lodash";
import { GroupInput } from "@/components/compound";

interface IStoryCardProps {
  story: any;
  onClick: () => void;
  onNext: () => void;
  onPrev: () => void;
  isBeginning?: boolean;
  isEnd?: boolean;
}

export const StoryCard: FC<IStoryCardProps> = ({ story, onClick, onNext, onPrev, isBeginning, isEnd }) => {
  const swiperSlide = useSwiperSlide();
  const [isLoadingMeteData, setIsLoadingMeteData] = useState<boolean>(true);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<number>(0);

  useEffect(() => {
    setIsReady(false);
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      setActiveVideo(0);
    };
  }, [swiperSlide.isActive]);

  useEffect(() => {
    setIsLoadingMeteData(true);
    if (activeVideo >= size(story?.video)) onNext();
  }, [activeVideo]);

  const handleTimeUpdate = (event: any) => {
    if (isEqual(event.target.currentTime, event.target.duration)) setActiveVideo((prev) => (prev < size(story?.video) ? prev + 1 : 0));

    const progress: any = $(`#story-card-progress-${activeVideo}`);

    if (!progress) return;
    progress.style.width = `${(event.target.currentTime / event.target.duration) * 100}%`;
  };

  const handleTogglePause = () => {
    const video: any = $("#story-video");
    if (!video) return;

    if (!video?.paused) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    const video: any = $("#story-video");

    if (!video) return;

    if (video?.muted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div
      className={classNames(
        "ks-story-card",
        { "-active": swiperSlide.isActive },
        { "-inactive": !swiperSlide.isActive },
        { "-next": swiperSlide.isNext },
        { "-prev": swiperSlide.isPrev }
      )}
    >
      <div className="blur">
        <KaImage src={story?.image || ""} objectFit="cover" className="image" />
      </div>

      {!swiperSlide?.isActive && (
        <div className="content" onClick={onClick}>
          <div className="normal">
            <div className="information">
              <div className="avatar">
                <Avatar src={story?.author?.avatar || ""} objectFit="cover" />
              </div>
              <span className="name">{story?.author?.name}</span>
            </div>
          </div>
        </div>
      )}

      {swiperSlide?.isActive && (
        <>
          <div className="content">
            <button className={classNames("action -left", { "-hidden": isBeginning })} onClick={onPrev}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button className={classNames("action -right", { "-hidden": isEnd })} onClick={() => setActiveVideo((prev) => prev + 1)}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className="header">
              <div className="progress">
                {times(size(story?.video), (index) => (
                  <div key={index} className="ks-story-card-progress">
                    <span className={classNames("slide", { "-full": index < activeVideo })} id={`story-card-progress-${index}`} />
                  </div>
                ))}
              </div>

              <div className="navigation">
                <div className="group">
                  <div className="information">
                    <div className="avatar">
                      <Avatar src={story?.author?.avatar || ""} className="image" objectFit="cover" size="sm" />
                    </div>

                    <span className="name">{story?.author?.name}</span>
                  </div>

                  <div className="action">
                    <i
                      className={classNames("fa-solid ", { "fa-play": !isPlaying }, { "fa-pause": isPlaying })}
                      onClick={handleTogglePause}
                    />
                    <i
                      className={classNames("fa-solid ", { "fa-volume": !isMuted }, { "fa-volume-xmark": isMuted })}
                      onClick={handleToggleMute}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="footer">
              <GroupInput className="input" placeholder="Comment..." />
              <span className="icon">
                ❤️
                <span className="fly">❤️</span>
              </span>
            </div>
          </div>

          {isReady && (
            <KaVideo
              id="story-video"
              className={classNames("video", { "-hidden": isLoadingMeteData })}
              src={get(story?.video, `[${activeVideo}]`, "")}
              width="100%"
              height="100%"
              autoPlay
              onLoadedMetadata={(event: any) => setIsLoadingMeteData(false)}
              onTimeUpdate={handleTimeUpdate}
            />
          )}
        </>
      )}

      {swiperSlide.isActive && isLoadingMeteData && (
        <div className={classNames("video", { "-loading": isLoadingMeteData })}>
          <CircularProgress color="secondary" className="spinner" />
        </div>
      )}
    </div>
  );
};
