import { GroupInput } from "@/components/compound";
import { KaImage } from "@/components/primitive/KaImage/index";
import { $ } from "@/utils/constants";
import Cropper from "cropperjs";
import { get, isEqual } from "lodash";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUserInfo } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

interface ICoverPictureProps {
  src: string;
}

const CoverPicture: FC<ICoverPictureProps> = ({ src }) => {
  const dispatch = useAppDispatch();
  const userInfo = useSelector((state: any) => state?.auth?.userInfo);
  const query = useParams();
  const slug = String(query?.slug || "");
  const [cropper, setCropper] = useState<any>(null);
  const editCoverPictureSettings: any = { aspectRatio: NaN, viewMode: 3, autoCropArea: 1, zoomable: false, cropBoxResizable: false };

  const [edit, setEdit] = useState<any>({
    isEditing: false,
    imageUrl: "",
  });

  useEffect(() => {
    const newCoverPictureElement: any = $("#new-cover-picture");
    if (!newCoverPictureElement) return;

    const cropperFrame = new Cropper(newCoverPictureElement, editCoverPictureSettings);

    setCropper(cropperFrame);

    return () => {
      cropperFrame.destroy();
      setCropper(null);
    };
  }, [edit?.imageUrl]);

  const handleChange = ({ name, value, files }: any) => {
    setEdit({ isEditing: true, imageUrl: URL.createObjectURL(get(files, "[0]", "")) });
  };

  const handleSubmit = () => {
    if (!cropper) return;

    const newCoverPicture = cropper?.getCroppedCanvas().toDataURL();
    if (!newCoverPicture) return;

    dispatch(updateUserInfo({ coverPicture: newCoverPicture }));
    setEdit({ isEditing: false, imageUrl: "" });
  };

  return (
    <div className="ks-profile-cover-picture">
      {edit?.isEditing && (
        <Fragment>
          <div className="guide">Drag to Reposition</div>

          <div className="group">
            <button className="button -submit" onClick={() => handleSubmit()}>
              Ok
            </button>

            <button
              className="button -cancel"
              onClick={() => {
                setEdit({ isEditing: false, imageUrl: "" });
              }}
            >
              Cancel
            </button>
          </div>
        </Fragment>
      )}

      {isEqual(slug, userInfo?.username) && (
        <label htmlFor="upload" className="edit">
          Upload cover photo
        </label>
      )}
      <GroupInput type="file" onChange={handleChange} id="upload" hidden accept="image/png, image/jpeg" />

      {!edit?.isEditing && <KaImage src={src} objectFit="cover" className="image" draggable="false" />}
      {edit?.isEditing && <img src={edit?.imageUrl || ""} className="preview" id="new-cover-picture" />}
    </div>
  );
};

export default CoverPicture;
