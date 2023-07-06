import React, { useEffect, useState } from "react";
import "./modalstories.scss";

interface TimeNextProps {
  timePause: boolean;
  open: boolean;
  handleNextStory: () => boolean;
  videoDuration: number;
  videoStart: boolean;
}

const TimeNext: React.FC<TimeNextProps> = (props) => {
  const [percent, setPercent] = useState(0);
  const [stop, setStop] = useState<boolean>(false);

  useEffect(() => {
    if (percent === 100 && !stop) {
      setStop(props.handleNextStory());
    }
    if (props.open) {
      if (!props.timePause && props.videoStart) {
        const time = setInterval(
          () => {
            percent < 100 ? setPercent((prev) => prev + 0.5) : setPercent(0);
          },
          props.videoDuration * 5 > 0 ? props.videoDuration * 5 : 30
        );
        return () => {
          clearInterval(time);
        };
      }
    } else {
      setPercent(0);
    }
  }, [percent, props.open, props.timePause, props.videoStart]);

  return (
    <div className="time-next">
      <span
        style={{
          width: `${stop ? "100" : percent}%`,
          transition: `${props.videoDuration === 0 ? 30 : props.videoDuration * 5}ms`,
        }}
      ></span>
    </div>
  );
};

export default TimeNext;
