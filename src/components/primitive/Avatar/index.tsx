/* eslint-disable @next/next/no-img-element */
import { isEmpty, includes } from "lodash";
import { ImgHTMLAttributes, useEffect, useState } from "react";
import classNames from "classnames";

export interface IAvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  hideOnError?: boolean;
  defaultImage?: string;
  loadingSize?: "sm" | "md" | "lg";
  size?: "sm" | "md" | "lg";
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  [key: string]: any;
}

const imagePathRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
const urlRegex = /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/;

export function Avatar({
  src,
  hideOnError,
  defaultImage,
  size,
  className,
  loadingSize = "md",
  objectFit,
  ...props
}: IAvatarProps) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [imageUrl, setImageUrl] = useState<string>("");

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
    const img = new Image();

    img.onerror = () => {
      if (isMounted) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    img.onload = () => {
      if (isMounted) {
        setImageUrl(url);
        setIsLoading(false);
      }
    };
    img.src = url;

    return () => {
      isMounted = false;
    };
  }, [src]);

  useEffect(() => {
    if (imageUrl) setIsLoading(false);
  }, [imageUrl]);

  if (isLoading)
    return (
      <div className="w-100 h-100 rounded-2 bg-success bg-opacity-25 d-flex align-items-center justify-content-center">
        <div className="animate-pulse w-100 h-100" />
      </div>
    );

  if (isError && hideOnError) return null;

  return (
    <img
      className={classNames("ks-avatar", `-${objectFit}`, `-${size}`, className)}
      src={isError ? defaultImage : imageUrl}
      alt={props.alt}
      {...props}
    />
  );
}

Avatar.defaultProps = {
  defaultImage: "/images/error.png",
  className: "",
  objectFit: "cover",
};
