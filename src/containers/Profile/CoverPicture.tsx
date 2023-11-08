import React, { useState, useEffect, useRef, FC } from "react";
import Cropper from "cropperjs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KaImage } from "@/components/primitive/KaImage/index";
import { get, isEqual } from "lodash";
import { GroupInput } from "@/components/compound";

interface ICoverPictureProps {
  src: string;
}

const CoverPicture: FC<ICoverPictureProps> = ({ src }) => {
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const query = useParams();
  const slug = String(query?.slug || "");
  const refCoverPicture = useRef(null);
  const [cropper, setCropper] = useState<Cropper | null>();

  useEffect(() => {
    console.log(src);
  });

  const [edit, setEdit] = useState<any>({
    isEditing: false,
    imageUrl: "",
  });

  useEffect(() => {
    if (!edit.imageUrl) return;
    if (cropper) cropper.destroy();

    if (refCoverPicture.current) {
      setCropper(
        new Cropper(refCoverPicture?.current, {
          aspectRatio: NaN,
          viewMode: 3,
          autoCropArea: 1,
          zoomable: false,
          cropBoxResizable: false,
        })
      );
    }
  }, [edit.imageUrl]);

  const handleChange = ({ name, value, files }: any) => {
    setEdit({ isEditing: true, imageUrl: URL.createObjectURL(get(files, "[0]", "")) });

    console.log(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async () => {
    const newCoverPicture = cropper?.getCroppedCanvas().toDataURL();
    console.log(newCoverPicture);
  };

  return (
    <div className="ks-profile-cover-picture">
      {edit?.isEditing && <div className="guide">Drag to Reposition</div>}

      {isEqual(slug, userInfo?.username) && (
        <label htmlFor="upload" className="edit">
          Upload cover photo
        </label>
      )}

      <GroupInput type="file" onChange={handleChange} id="upload" hidden accept="image/png, image/jpeg" />
      {!edit?.isEditing && <KaImage src={src} objectFit="cover" className="image" draggable="false" />}
      {edit?.isEditing && <img src={edit?.imageUrl || ""} className="preview" ref={refCoverPicture} />}
    </div>
  );
};

export default CoverPicture;
