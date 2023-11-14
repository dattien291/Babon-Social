import { isEqual } from "lodash";
import React, { FC, useEffect, useState } from "react";

interface IProgressProps {
  onNext: () => void;
}

const END_PROGRESS = 100;

const Progress: FC<IProgressProps> = ({ onNext = () => {} }) => {
  const [percent, setPercent] = useState(0);
  //   const [stop, setStop] = useState<boolean>(false);

  useEffect(() => {
    const time = setInterval(() => {
      setPercent((prev) => (prev < END_PROGRESS ? prev + 1 : 0));
    }, 50);

    return () => {
      clearInterval(time);
    };
  }, []);

  useEffect(() => {
    if (isEqual(percent, END_PROGRESS)) onNext();
  }, [percent]);

  return (
    <div className="ks-story-card-progress">
      <span
        className="slide"
        style={{
          width: `${percent}%`,
          transition: `width ${50}ms linear`,
        }}
      />
    </div>
  );
};

export default Progress;
