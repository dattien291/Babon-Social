import { ThemeContext } from "@/contexts/Theme";
import { Modal } from "@mui/material";
import classNames from "classnames";
import { isEqual } from "lodash";
import { FC, useContext, useEffect, useState } from "react";
import Create from "./Create";
import Edit from "./Edit";

interface ICreatePostModal {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePostModal: FC<ICreatePostModal> = ({ open, onClose, onSuccess }) => {
  const { theme } = useContext(ThemeContext);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [imageSelected, setImageSelected] = useState<string>("");

  useEffect(() => {
    setMode("create");
  }, [open]);

  const handleSetMode = (mode: any) => {
    setMode(mode);
  };

  const handleChangeImageSelected = (imgUrl: string) => {
    setImageSelected(imgUrl);
  };

  return (
    <Modal open={open} onClose={onClose} className={classNames("ks-create-post-modal", { "-dark": theme })}>
      <div className="box">
        <span className="close" onClick={onClose}>
          <i className="fa-regular fa-xmark"></i>
        </span>

        {isEqual(mode, "create") && <Create onChangeMode={handleSetMode} onEdit={handleChangeImageSelected} onSuccess={onSuccess} />}
        {isEqual(mode, "edit") && <Edit onChangeMode={handleSetMode} imageUrl={imageSelected} />}
      </div>
    </Modal>
  );
};

export default CreatePostModal;
