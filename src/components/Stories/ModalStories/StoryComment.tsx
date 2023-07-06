import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface StoryCommentProps {}

const StoryComment: React.FC<StoryCommentProps> = ({}) => {
  const [textComment, setTextComment] = useState<string>("");
  const [textCommentSubmit, setTextCommentSubmit] = useState<string>("");

  useEffect(() => {
    let time = setTimeout(() => {
      setTextCommentSubmit("");
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [textCommentSubmit]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTextComment("");
    setTextCommentSubmit(textComment);
  };

  return (
    <div className="story-comment">
      <form onSubmit={handleSubmit}>
        <input
          maxLength={30}
          type="text"
          placeholder="Comment..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTextComment(e.target.value)}
          value={textComment}
        />
      </form>

      {textCommentSubmit && <span className="comment-fly">{textCommentSubmit}</span>}

      <span className="pick-heart">
        ❤️️ <span className="heart-fly">❤️</span>
      </span>
    </div>
  );
};

export default StoryComment;
