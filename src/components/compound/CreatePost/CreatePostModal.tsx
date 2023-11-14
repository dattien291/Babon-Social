import { Modal } from "@mui/material";
import { FC } from "react";

interface ICreatePostModal {
  open: boolean;
  onClose: () => void;
}

const CreatePostModal: FC<ICreatePostModal> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} className="ks-create-post-modal">
      <div className="box">Abc</div>
    </Modal>
  );
};

export default CreatePostModal;
