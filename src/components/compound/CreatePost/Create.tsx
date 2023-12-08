import { Fragment, FC, useContext, useCallback } from "react";
import { useFormik } from "formik";
import { get, map } from "lodash";
import { GroupInput } from "../GroupInput";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUserInfo } from "@/store/auth/selectors";
import { Avatar, Button, KaImage } from "@/components/primitive";
import { GroupTextarea } from "../GroupTextarea";
import { ThemeContext } from "@/contexts/Theme";
import classNames from "classnames";

interface ICreateProps {
  onChangeMode: (value: any) => void;
  onEdit: (value: any) => void;
  onSuccess: () => void;
}

const Create: FC<ICreateProps> = ({ onChangeMode, onEdit, onSuccess }) => {
  const userInfo = useAppSelector(selectUserInfo);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    return () => {
      setFieldValue("files", []);
    };
  }, [open]);

  const { setFieldValue, resetForm, handleSubmit, values, errors } = useFormik({
    initialValues: {
      text: "",
      files: [],
    },

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      onSuccess();
      resetForm();
    },
  });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleChangeMetadata = useCallback(({ name, value, files }: { name: string; value: string | number; files?: any }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue("files", [...values.files, reader?.result]);
    };
    reader.readAsDataURL(get(files, "[0]", ""));
  }, []);

  const handleChangeMode = (index: number) => (event: any) => {
    onChangeMode("edit");
    onEdit(get(values.files, `[${index}]`, ""));
  };

  return (
    <div className={classNames("ks-create-post-create-mode", { "-dark": theme })}>
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

      <label htmlFor="upload-image-post" className="metadata">
        Add to your post
        <span className="icon">
          <i className="fa-regular fa-image"></i>
        </span>
      </label>
      <GroupInput type="file" id="upload-image-post" hidden accept="image/png, image/jpeg" name="files" onChange={handleChangeMetadata} />

      <div className="group">
        <Button color="primary" fullWidth className="button" disabled={!values.text} onClick={() => handleSubmit()}>
          Publish
        </Button>
      </div>

      <ul className="list">
        {map(values.files, (file, index) => (
          <li className="item" key={index}>
            <Button className="button" color="light" variant="contained" size="md" onClick={handleChangeMode(index)}>
              Edit
            </Button>

            <KaImage src={file || ""} className="image" objectFit="cover" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Create;
