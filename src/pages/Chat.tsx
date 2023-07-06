import React, { useEffect, useState } from "react";
import "../styles/dashboard.scss";
import "../styles/chat.css";
import { Input } from "antd";
import listFriend, { InfoFriend } from "../assets/fake-data/ListFriend";
import ContentChat from "../components/ContentChat/ContentChat";
import { Link, useParams } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import useNavigateLocal from "../hooks/useNavigateLocal";

const Chat: React.FC = () => {
  const navigate = useNavigateLocal();
  const params = useParams();
  const friendChoose: InfoFriend | undefined = listFriend.find((item) => item.id === params.id);
  const [contentChat, setContentChat] = useState<InfoFriend | undefined>(friendChoose);
  const [dataListFriend, setDataListFriend] = useState(listFriend);
  const [searchFriend, setSearchFriend] = useState<string>("");

  useEffect(() => {
    if (searchFriend) {
      setDataListFriend(
        listFriend.filter((item) => item.username.toLocaleLowerCase().search(searchFriend.toLocaleLowerCase()) !== -1)
      );
    } else {
      setDataListFriend(listFriend);
    }
  }, [searchFriend]);

  const onSubmitMessage = (value: string): void => {
    const day = new Date();
    let hour = day.getHours().toString();
    let minutes = day.getMinutes().toString();
    if (contentChat) {
      const id = (contentChat.message.length + 1).toString();
      setContentChat({
        ...contentChat,
        message: [...contentChat.message, { id: id, text: value, time: `${hour}:${minutes}`, emoji: "" }],
      });
    }
  };

  const recallMessage = (idMessage: string): void => {
    if (contentChat) {
      const newMessage = contentChat.message.map((item) => (item.id === idMessage ? { ...item, text: "true" } : item));
      setContentChat({ ...contentChat, message: newMessage });
    }
  };

  const onChangeEmoji = (idMessage: string, iconEmoji: string): void => {
    if (contentChat) {
      const newMessage = contentChat.message.map((item) => (item.id === idMessage ? { ...item, emoji: iconEmoji } : item));
      setContentChat({ ...contentChat, message: newMessage });
    }
  };

  return (
    <div>
      <div className="background-image"></div>
      <div className="wrapper-chat">
        <div
          className="wrapper-sidebar-chat"
          style={{
            width: "280px",
            transition: "width 0.2s linear",
          }}
        >
          <span>
            <Link to={"/dashboard"} style={{ fontSize: "35px" }}>
              <RiArrowLeftSLine></RiArrowLeftSLine>
            </Link>
            <span style={{ fontFamily: "math", fontWeight: "600", fontSize: "25px" }}>Chats</span>
          </span>
          <Input placeholder="Search..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchFriend(e.target.value)} />
          {/* <input type="text" placeholder="Tìm kiếm"/> */}

          <ul className="list-friend">
            {dataListFriend.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setContentChat(item);
                  navigate.directional("/chat", item.id);
                }}
              >
                <div className="avatar-friend">{item.username.slice(0, 2).toUpperCase()}</div>
                <div className="friend-info">
                  <div>{item.username}</div>
                  <span className="last-message">
                    {item.message.length !== 0 ? item.message[item.message.length - 1].text : "Gửi lời chào!"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="content-chat"
          style={{
            justifyContent: `${contentChat?.username ? "" : "center"}`,
            alignItems: `${contentChat?.username ? "" : "center"}`,
          }}
        >
          {contentChat?.username ? (
            <ContentChat
              infoFriend={contentChat}
              onSubmitMessage={onSubmitMessage}
              recallMessage={recallMessage}
              onChangeEmoji={onChangeEmoji}
            />
          ) : (
            <div>Không tìm thấy bạn bè hợp lệ</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
