import React from "react";
import { FormEvent, ChangeEvent, useState, useRef, useEffect } from "react";
import { InfoFriend } from "../../assets/fake-data/ListFriend";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { Input, Popover } from "antd";
import iconSmile1 from "../../assets/images/newsfeed/grinning-face-with-big-eyes-svgrepo-com.svg";
import listEmoji, { listEmojiChat } from "../../assets/fake-data/listEmoji";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { RiArrowLeftSLine, RiEmotionLine } from "react-icons/ri";
import "./contentchat.css";

interface ContentChatProps {
  infoFriend: InfoFriend;
  onSubmitMessage: (value: string) => void;
  recallMessage: (idMessage: string) => void;
  onChangeEmoji: (idMessage: string, icon: string) => void;
}

const ContentChat: React.FC<ContentChatProps> = ({ infoFriend, onSubmitMessage, recallMessage, onChangeEmoji }) => {
  const dataUser = useSelector((state: RootState) => state.auth.dataUser); //redux
  const [valueMessenger, setValueMessenger] = useState<string>("");
  const [idMessageChangeEmoji, setIdMessageChangeEmoji] = useState<string>("");
  const messengerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messengerRef.current) {
      messengerRef.current.scrollTop = messengerRef.current.scrollHeight;
    }
  }, [infoFriend.message.length]);

  const handleMessengerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueMessenger(event.target.value);
  };

  const handleSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitMessage(valueMessenger);
    setValueMessenger("");
  };

  const handleRecallMessage = (idMessage: string) => {
    recallMessage(idMessage);
  };

  const handleChangeEmojiMessage = (idMessage: string) => {
    setIdMessageChangeEmoji(idMessage);
  };

  const contentEmoji = (
    <ul className="list-emoji">
      {listEmoji.map((item) => (
        <li key={item.id} onClick={() => onChangeEmoji(idMessageChangeEmoji, item.icon)}>
          <img src={item.img} alt="emoji" />
        </li>
      ))}
    </ul>
  );

  const contentEmojiChat: JSX.Element = (
    <ul className="list-emoji-chat">
      {listEmojiChat.map((item) => (
        <li key={item.id} onClick={() => setValueMessenger((prev) => prev + item.icon)}>
          {item.icon}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <header className="header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to={"/chat"} style={{ fontSize: "30px" }} className="back-to-chat">
            <RiArrowLeftSLine></RiArrowLeftSLine>
          </Link>
          <div className="avatar-friend">{infoFriend.username.slice(0, 2).toUpperCase()}</div>
          <div className="friend-info">
            <div>{infoFriend.username}</div>
          </div>
        </div>
        <div className="icon">
          <img src="/phone-svgrepo-com1.svg" alt="phoneIcon" width={"30px"} />
          <img src="/camera-svgrepo-com.svg" alt="cameraIcon" width={"35px"} />
          <img src="/more-horizontal-square-svgrepo-com.svg" alt="moreIcon" width={"30px"} />
        </div>
      </header>
      <div className="body">
        <div className="messenger" ref={messengerRef}>
          {infoFriend.message.map((item) => (
            <div key={item.id}>
              <div className="items-chat">
                {item.text !== "true" && (
                  <>
                    <Popover content={contentEmoji} trigger="click">
                      <div className="option">
                        <img src={iconSmile1} alt="iconSmile1" onClick={() => handleChangeEmojiMessage(item.id)} />
                      </div>
                    </Popover>
                    <Popover
                      content={
                        <div>
                          <button
                            onClick={() => {
                              handleRecallMessage(item.id);
                            }}
                          >
                            Thu hồi
                          </button>
                          <button>Sao chép</button>
                        </div>
                      }
                      trigger="click"
                    >
                      <div className="option">
                        <MoreOutlined style={{ fontSize: "18px", color: "#000" }} />
                      </div>
                    </Popover>
                  </>
                )}
                <div className="message" style={{ color: `${item.text === "true" && "gray"}` }}>
                  {item.text !== "true" && <span className="time-message">{item.time}</span>}
                  {item.emoji !== "" && (
                    <span className="emoji-message">
                      <img src={item.emoji} alt="emoji" /> 1
                    </span>
                  )}
                  {item.text === "true" ? "Tin nhắn đã thu hồi" : item.text} <br />
                </div>
                <div className="avatar-friend">{dataUser.name.slice(0, 2).toLocaleUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
        <form className="from-group" onSubmit={handleSubmitMessage}>
          <div className="hover-background">
            <label htmlFor="upLoad" style={{ cursor: "pointer" }}>
              <PlusOutlined style={{ fontSize: "25px", color: "#000" }} />
            </label>
          </div>
          <input type="file" style={{ display: "none" }} id="upLoad" />
          <Input placeholder="Viết tin nhắn" onChange={handleMessengerChange} value={valueMessenger} />
          <Popover placement="top" content={contentEmojiChat} trigger="click">
            <div className="hover-background">
              <RiEmotionLine></RiEmotionLine>
            </div>
          </Popover>
        </form>
      </div>
    </>
  );
};

export default ContentChat;
