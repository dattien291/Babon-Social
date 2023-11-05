import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { Picture } from "../../assets/fake-data/Posts";

interface ImageBlurProps {
  picture: Picture;
  refCoverPicture?: React.RefObject<HTMLImageElement>;
}

const ImageBlur: React.FC<ImageBlurProps> = (props: ImageBlurProps) => {
  const { picture = { url: "", blurHash: "" } } = props;
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = picture.url;
  }, [picture.url]);

  return (
    <>
      {!imageLoaded && (
        <Blurhash
          hash={picture.blurHash || "L7CPn#$}5M9F03^+Ip%X9p4n^-I{"}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}

      <img
        ref={props.refCoverPicture ? props.refCoverPicture : null}
        src={picture.url}
        loading="lazy"
        style={{
          filter: `${imageLoaded ? "blur(0px)" : "blur(10px)"}`,
          visibility: `${imageLoaded ? "visible" : "hidden"}`,
          transition: "filter 0.2s linear",
        }}
      />
    </>
  );
};

export default ImageBlur;
