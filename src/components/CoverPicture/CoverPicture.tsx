import React, { useState, useEffect, useRef } from "react";
import "../../styles/profile.scss";
import "./coverpicture.scss";
import ImageBlur from "../ImageBlur/ImageBlur";
import Cropper from "cropperjs";
import { Picture } from "../../assets/fake-data/Posts";
import { useSelector } from "react-redux";
import { updateCoverPicture } from "../../assets/fake-data/User";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { RiDragMove2Fill } from "react-icons/ri";
import { Spin } from "antd";

interface CoverPictureProps {
  picture: Picture;
}

const CoverPicture: React.FC<CoverPictureProps> = ({ picture }) => {
  const dataUser = useSelector((state: RootState) => state.auth.dataUser);
  const username = useParams();
  const [previewCoverPicture, setPreviewCoverPicture] = useState<string>("");
  const refCoverPicture = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<Cropper | null>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newCoverPictureUpload, setNewCoverPictureUpload] = useState<Picture>();
  const [isLoadingSubmitCoverPicture, setIsLoadingSubmitCoverPicture] = useState<boolean>(false);

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (cropper) cropper.destroy();
    setPreviewCoverPicture("");
    setNewCoverPictureUpload(undefined);
  };

  useEffect(() => {
    handleCancelEdit();
  }, [username.username]);

  useEffect(() => {
    if (!previewCoverPicture) return;
    if (cropper) cropper.destroy();

    if (refCoverPicture.current) {
      const cropper1 = new Cropper(refCoverPicture.current, {
        aspectRatio: NaN,
        viewMode: 3,
        autoCropArea: 1,
        zoomable: false,
        cropBoxResizable: false,
      });
      setCropper(cropper1);
    }
  }, [previewCoverPicture]);

  const hanleOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const file = event.target.files ? event.target.files[0] : null;
    file && setPreviewCoverPicture(URL.createObjectURL(file));
    event.target.value = "";
  };

  const handleOkEdit = async () => {
    setIsEditing(false);
    const newCoverPicture = cropper?.getCroppedCanvas().toDataURL();
    if (newCoverPicture) {
      setIsLoadingSubmitCoverPicture(true);
      await updateCoverPicture(dataUser.username, newCoverPicture);
      setIsLoadingSubmitCoverPicture(false);
      setNewCoverPictureUpload({ url: newCoverPicture, blurHash: "" });
      setPreviewCoverPicture("");
      cropper && cropper.destroy();
      setCropper(null);
    }
  };

  return (
    <div className="wrapper-cover-picture">
      {isEditing && (
        <button className="edit-cover-photo guide-drag-coverpicture">
          <RiDragMove2Fill></RiDragMove2Fill> Drag to Reposition
        </button>
      )}
      {username.username === dataUser.username &&
        (isEditing ? (
          <div className="grbtn-edit-cover">
            <button className="edit-cover-photo" onClick={handleOkEdit}>
              Ok
            </button>
            <button className="edit-cover-photo" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <label htmlFor="upLoadCoverPhoto" className="edit-cover-photo">
            Upload cover photo
          </label>
        ))}
      <input id="upLoadCoverPhoto" type="file" style={{ display: "none" }} onChange={hanleOnChangeFile} />
      <div className="cover-picture">
        {isLoadingSubmitCoverPicture && (
          <div className="spinner-loading">
            <Spin />
          </div>
        )}
        {previewCoverPicture && (
          <ImageBlur picture={{ url: previewCoverPicture, blurHash: "" }} refCoverPicture={refCoverPicture} />
        )}
        <ImageBlur picture={newCoverPictureUpload || picture} refCoverPicture={refCoverPicture} />
      </div>
    </div>
  );
};

export default CoverPicture;
