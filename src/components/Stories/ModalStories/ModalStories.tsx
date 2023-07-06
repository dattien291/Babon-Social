import React, { useEffect, useRef, useState } from "react";
import "./modalstories.scss";
import {
  RiCloseLine,
  RiPlayFill,
  RiMoreFill,
  RiVolumeUpFill,
  RiVolumeMuteFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import { Story } from "../../../assets/fake-data/ListStories";
import TimeNext from "./TimeNext";
import useNavigateLocal from "../../../hooks/useNavigateLocal";
import StoryComment from "./StoryComment";

interface ModalStoriesProps {
  open: boolean;
  onClose: () => void;
  indexStorySelected: number;
  dataStories: Story[];
  confirmIndexSeen: (index: number) => void;
}

const ModalStories: React.FC<ModalStoriesProps> = ({ open, onClose, indexStorySelected, dataStories, confirmIndexSeen }) => {
  const [index, setIndex] = useState<number>(-1);
  const navigate = useNavigateLocal();
  const [timePause, setTimePause] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const refModalStories = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoStart, setVideoStart] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current && open) {
      timePause ? audioRef.current.pause() : audioRef.current.play();
      audioRef.current.muted = mute;
    } else if (videoRef.current && open) {
      timePause ? videoRef.current.pause() : videoRef.current.play();
      videoRef.current.muted = mute;
    }
  }, [timePause, mute]);

  useEffect(() => {
    setVideoStart(false);
    if (videoRef.current) {
      const temp = videoRef.current;
      const getDuration = () =>
        new Promise<number>((resolve) => {
          temp.onloadedmetadata = () => {
            resolve(temp.duration);
          };
        });

      getDuration().then((duration) => {
        setVideoDuration(Math.floor(duration));
        setVideoStart(true);
      });
    } else {
      if (audioRef.current) {
        const temp = audioRef.current;
        const getPlayAudio = () =>
          new Promise<boolean>((resolve) => {
            temp.onloadedmetadata = () => {
              resolve(true);
            };
          });

        getPlayAudio().then(() => {
          setVideoStart(true);
        });
      }
      setVideoDuration(0);
    }

    if (refModalStories.current) {
      refModalStories.current.scrollLeft = 290 * index;
    }
    setTimePause(false);
    confirmIndexSeen(index);
  }, [index, open]);

  useEffect(() => {
    if (open) {
      setIndex(indexStorySelected);
    }
  }, [open]);

  const handleNextStory = () => {
    if (index < dataStories.length - 1) {
      setIndex((prev) => prev + 1);
      return false;
    } else {
      return true;
    }
  };

  const handleNavigateProfile = (username: string) => {
    navigate.directional("/profile", { isMyProfile: false, dataProfile: username });
  };

  return (
    <div ref={refModalStories} className={`modal-stories-photos ${open ? "modal-stories-show" : ""}`}>
      <div className="btn-close-modal">
        <button
          onClick={() => {
            onClose();
            setTimePause(false);
          }}
        >
          <RiCloseLine></RiCloseLine>
        </button>
      </div>
      <div className="image-preview default1" style={{ visibility: "hidden" }}>
        <div className="image-preview-items "></div>
      </div>
      <div className="image-preview default2" style={{ visibility: "hidden" }}>
        <div className="image-preview-items"></div>
      </div>
      {dataStories.map((story) => (
        <div key={story.id} className={`image-preview ${index === parseInt(story.id) - 1 ? "story-active" : ""}`}>
          {index === parseInt(story.id) - 1 && index > 0 && (
            <button className="prev-story" onClick={() => index > 0 && setIndex(index - 1)}>
              <RiArrowLeftSLine></RiArrowLeftSLine>
            </button>
          )}
          <div className="backgr-stories-blur">
            <img src={story.image[0].url} alt="" />
          </div>
          <div className="image-preview-items" onClick={() => setIndex(parseInt(story.id) - 1)}>
            {index === parseInt(story.id) - 1 && open ? (
              <TimeNext
                timePause={timePause}
                open={open}
                handleNextStory={handleNextStory}
                videoDuration={videoDuration}
                videoStart={videoStart}
              />
            ) : (
              <></>
            )}
            <div className="time-pause">
              <div className="information">
                <div className="avatar-friend" onClick={() => handleNavigateProfile(story.username)}>
                  {story.avatar ? <img src={story.avatar} /> : story.name.slice(0, 2).toLocaleUpperCase()}
                </div>
                <span onClick={() => handleNavigateProfile(story.username)}>{story.name}</span>
              </div>
              {index === parseInt(story.id) - 1 && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setTimePause((prev) => !prev)}>
                    {timePause ? <RiPlayFill></RiPlayFill> : <span className="btn-pause"></span>}
                  </button>
                  <button onClick={() => setMute((prev) => !prev)}>
                    {mute ? <RiVolumeMuteFill></RiVolumeMuteFill> : <RiVolumeUpFill></RiVolumeUpFill>}
                  </button>
                  <button>
                    <RiMoreFill></RiMoreFill>
                  </button>
                </div>
              )}
            </div>

            {index + 1 === parseInt(story.id) && <StoryComment />}

            {story.video && index + 1 === parseInt(story.id) ? (
              open ? (
                <video id="videoStory" ref={videoRef} autoPlay src={story.video}></video>
              ) : (
                <></>
              )
            ) : (
              <img src={story.image[0].url} draggable="false" style={{ borderRadius: "20px" }} />
            )}
            {story.audio && index + 1 === parseInt(story.id) && open ? (
              <audio ref={audioRef} autoPlay src={story.audio}></audio>
            ) : (
              <></>
            )}
          </div>

          {index === parseInt(story.id) - 1 && index < dataStories.length - 1 && (
            <button className="next-story" onClick={() => index < dataStories.length - 1 && setIndex(index + 1)}>
              <RiArrowRightSLine></RiArrowRightSLine>
            </button>
          )}
        </div>
      ))}
      <div className="image-preview default3" style={{ visibility: "hidden" }}>
        <div className="image-preview-items"></div>
      </div>
      <div className="image-preview default4" style={{ visibility: "hidden" }}>
        <div className="image-preview-items"></div>
      </div>
    </div>
  );
};

export default ModalStories;
