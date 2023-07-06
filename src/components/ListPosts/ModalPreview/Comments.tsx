import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface CommentsProps {
  onSubmitComment: (text: string) => void;
}

const Comments: React.FC<CommentsProps> = ({ onSubmitComment }) => {
  const dataUser = useSelector((state: RootState) => state.auth.dataUser);
  const [textComment, setTextComment] = useState<string>("");

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextComment(event.target.value);
  };

  const handleSubmitComment = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (textComment) {
      onSubmitComment(textComment);
      setTextComment("");
    }
  };

  return (
    <div className="create-comment">
      <div className="avatar-friend">
        {dataUser.avatar ? <img src={dataUser.avatar} /> : dataUser.name.slice(0, 2).toLocaleUpperCase()}
      </div>
      <div className="input-comment">
        <form onSubmit={handleSubmitComment}>
          <input type="text" placeholder="Write a comment..." onChange={handleChangeComment} value={textComment} />
        </form>
      </div>
    </div>
  );
};

export default Comments;
