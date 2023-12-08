import { Avatar } from "@/components/primitive";
import { ThemeContext } from "@/contexts/Theme";
import { selectUserInfo } from "@/store/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import classNames from "classnames";
import { FC, useContext, useState } from "react";
import CreatePostModal from "./CreatePostModal";

interface ICreatePostProps {
  onSuccess: () => void;
}

export const CreatePost: FC<ICreatePostProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const { theme } = useContext(ThemeContext);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={classNames("ks-create-post", { "-dark": theme })}>
      <CreatePostModal open={openModal} onClose={() => setOpenModal(false)} onSuccess={onSuccess} />

      <div className="avatar">
        <Avatar src={userInfo?.avatar || ""} objectFit="cover" size="md" />
      </div>

      <div className="field" onClick={() => setOpenModal(true)}>
        What's on your my mind ?
      </div>
    </div>
  );
};
