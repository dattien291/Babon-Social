import { ceil, isEmpty, isEqual } from "lodash";
import React, { FC, useEffect, useState } from "react";

interface IProgressProps {
  playing: boolean;
  metadata: any;
  onNext?: () => void;
  onPause?: () => void;
}

const END_PROGRESS = 100;

const Progress: FC<IProgressProps> = ({ onNext = () => {}, playing = false, onPause = () => {}, metadata = {} }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (metadata?.isLoading || !metadata?.duration) return;

    const time = setInterval(() => {
      setPercent((prev) => (prev < END_PROGRESS && playing ? prev + 1 : 0));
    }, metadata?.duration * 10);

    return () => {
      clearInterval(time);
    };
  }, [playing, metadata]);

  useEffect(() => {
    if (isEqual(percent, END_PROGRESS)) onNext();
  }, [percent]);

  return (
    <div className="ks-story-card-progress">
      <span
        className="slide"
        style={{
          width: `${percent}%`,
          transition: `width ${metadata?.duration * 10}ms linear`,
        }}
      />
    </div>
  );
};

export default Progress;
