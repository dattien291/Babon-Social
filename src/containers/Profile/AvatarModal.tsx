import { GroupInput } from "@/components/compound";
import { Avatar, Button } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { updateUserInfo } from "@/store/auth/authSlice";
import { selectUserInfo } from "@/store/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { $ } from "@/utils/constants";
import { Modal } from "@mui/material";
import classNames from "classnames";
import Cropper from "cropperjs";
import { get, isEqual } from "lodash";
import { FC, useContext, useEffect, useState } from "react";

interface AvatarModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
}

const AvatarModal: FC<AvatarModalProps> = ({ open, onClose, imageUrl }) => {
  const { theme } = useContext(ThemeContext);
  const [cropper, setCropper] = useState<any>(null);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);

  const [edit, setEdit] = useState<any>({
    isEditing: false,
    imageUrl: "",
  });

  const editAvatarSettings: any = {
    aspectRatio: 1 / 1,
    autoCropArea: 1,
    viewMode: 1,
  };

  useEffect(() => {
    if (!open) setEdit({ isEditing: false, imageUrl: "" });
  }, [open]);

  useEffect(() => {
    const newAvatarElement: any = $("#new-avatar-profile");
    if (!newAvatarElement || !edit?.imageUrl) return;

    const cropperFrame = new Cropper(newAvatarElement, editAvatarSettings);
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

    const newAvatar = cropper?.getCroppedCanvas().toDataURL();
    if (!newAvatar) return;

    dispatch(updateUserInfo({ avatar: newAvatar }));
    setEdit({ isEditing: false, imageUrl: "" });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className={classNames("ks-profile-avatar-modal", { "-dark": theme })}>
      <div className="box">
        <h2 className="heading">Edit Profile</h2>

        <div className="avatar">
          {!edit.isEditing && <Avatar src={imageUrl || ""} objectFit="cover" className="image" />}

          {!edit.isEditing && isEqual(imageUrl, userInfo?.avatar) && (
            <label htmlFor="upload-avatar" className="edit">
              Upload
            </label>
          )}
          <GroupInput type="file" onChange={handleChange} id="upload-avatar" hidden accept="image/png, image/jpeg" />

          <img src={edit?.imageUrl || ""} className="preview" id="new-avatar-profile" />
        </div>

        <div className="group">
          <Button color="primary" variant="contained" size="md" className="button" onClick={handleSubmit}>
            OK
          </Button>

          <Button color="primary" variant="outlined" size="md" className="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AvatarModal;
