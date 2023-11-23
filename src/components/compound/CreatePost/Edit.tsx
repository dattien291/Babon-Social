import { KaImage } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { $ } from "@/utils/constants";
import classNames from "classnames";
import Cropper from "cropperjs";
import { FC, useContext, useEffect, useState } from "react";

interface IEditProps {
  onChangeMode: (value: any) => void;
  imageUrl: string;
}

const Edit: FC<IEditProps> = ({ onChangeMode, imageUrl }) => {
  const { theme } = useContext(ThemeContext);
  const [cropper, setCropper] = useState<any>(null);
  const editNewImageSettings: any = { aspectRatio: 16 / 9, viewMode: 1, zoomable: false, autoCropArea: 1 };

  useEffect(() => {
    const newImageElement: any = $("#edit-image-post");

    if (!newImageElement || !imageUrl) return;

    const cropperFrame = new Cropper(newImageElement, editNewImageSettings);
    setCropper(cropperFrame);

    return () => {
      cropperFrame.destroy();
      setCropper(null);
    };
  }, [imageUrl]);

  return (
    <div className={classNames("ks-create-post-edit-mode", { "-dark": theme })}>
      <h2 className="heading">Edit</h2>

      <div className="wrapper">
        <div className="sidebar">
          <ul className="list">
            <li className="item">
              <span className="icon">
                <i className="fa-regular fa-crop"></i>
              </span>
              <p className="text">Crop</p>
            </li>
            <li className="item">
              <span className="icon">
                <i className="fa-regular fa-rotate"></i>
              </span>
              <p className="text">Rotate</p>
            </li>
            <li className="item">
              <span className="icon">
                <i className="fa-regular fa-a"></i>
              </span>
              <p className="text">Text Tool</p>
            </li>
          </ul>
        </div>

        <div className="content">
          <img src={imageUrl || ""} className="preview" id="edit-image-post" />
        </div>
      </div>
    </div>
  );
};

export default Edit;
