/* eslint-disable @next/next/no-img-element */
import { isEmpty, includes } from "lodash";
import { VideoHTMLAttributes, useEffect, useState } from "react";
import classNames from "classnames";

export interface IVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  defaultImage?: string;
  loadingSize?: "sm" | "md" | "lg";
  className?: string;
  [key: string]: any;
}

const imagePathRegex = /\.(mp4)$/i;

export function KaVideo({ src, defaultImage, className, loadingSize = "md", objectFit, ...props }: IVideoProps) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    if (!imagePathRegex.test(src) || isEmpty(src)) {
      if (isMounted) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
    }

    const url = src;
    const audio = new Audio();

    audio.onerror = () => {
      if (isMounted) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    audio.onload = () => {
      if (isMounted) {
        setVideoUrl(url);
        setIsLoading(false);
      }
    };
    audio.src = url;

    return () => {
      isMounted = false;
    };
  }, [src]);

  useEffect(() => {
    if (videoUrl) setIsLoading(false);
  }, [videoUrl]);

  if (isLoading)
    return (
      <div className="w-100 h-100 rounded-2 bg-success bg-opacity-25 d-flex align-items-center justify-content-center">
        <div className="animate-pulse w-100 h-100" />
      </div>
    );

  if (isError) return null;

  return <video className={classNames("ks-video", className)} src={isError ? defaultImage : videoUrl} {...props} />;
}

KaVideo.defaultProps = {
  defaultImage: "/images/error.png",
  className: "",
};
