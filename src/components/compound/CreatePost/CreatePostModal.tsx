import { GroupTextarea } from "@/components/compound";
import { Avatar, Button, KaImage } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { selectUserInfo } from "@/store/auth/selectors";
import { useAppSelector } from "@/store/hooks";
import { Modal } from "@mui/material";
import classNames from "classnames";
import { useFormik } from "formik";
import { get, map } from "lodash";
import { FC, useContext } from "react";
import { GroupInput } from "../GroupInput";

interface ICreatePostModal {
  open: boolean;
  onClose: () => void;
}

const CreatePostModal: FC<ICreatePostModal> = ({ open, onClose }) => {
  const userInfo = useAppSelector(selectUserInfo);
  const { theme } = useContext(ThemeContext);

  const { setFieldValue, resetForm, handleSubmit, values, errors } = useFormik({
    initialValues: {
      text: "",
      files: [],
    },

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      resetForm();
    },
  });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleChangeMetadata = ({ name, value, files }: { name: string; value: string | number; files?: any }) => {
    const imageUrl = URL.createObjectURL(get(files, "[0]", ""));
    setFieldValue("files", [...values.files, imageUrl]);
  };

  return (
    <Modal open={open} onClose={onClose} className={classNames("ks-create-post-modal", { "-dark": theme })}>
      <div className="box">
        <span className="close" onClick={onClose}>
          <i className="fa-regular fa-xmark"></i>
        </span>

        <h2 className="heading">Create Post</h2>

        <div className="information">
          <div className="avatar">
            <Avatar src={userInfo?.avatar || ""} objectFit="cover" size="md" />
          </div>

          <span className="name">{userInfo?.name}</span>
        </div>

        <form className="form">
          <GroupTextarea
            className="textarea"
            placeholder="What's on your my mind ?"
            onChange={handleChange}
            name="text"
            value={values.text}
          />
        </form>

        <label htmlFor="upload" className="metadata">
          Add to your post
          <span className="icon">
            <i className="fa-regular fa-image"></i>
          </span>
        </label>
        <GroupInput type="file" id="upload" hidden accept="image/png, image/jpeg" name="files" onChange={handleChangeMetadata} />

        <div className="group">
          <Button color="primary" fullWidth className="button" disabled={!values.text} onClick={() => handleSubmit()}>
            Publish
          </Button>
        </div>

        <ul className="list">
          {map(values.files, (file, index) => (
            <li className="item" key={index}>
              <KaImage src={file || ""} className="image" objectFit="cover" />
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
