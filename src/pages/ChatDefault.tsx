import React, { useEffect, useState } from "react";
import "../styles/dashboard.scss";
import "../styles/defaultchat.css";
import { Input } from "antd";
import listFriend, { InfoFriend } from "../assets/fake-data/ListFriend";
import { Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import useNavigateLocal from "../hooks/useNavigateLocal";

const ChatDefault: React.FC = () => {
  const navigate = useNavigateLocal();
  const [dataListFriend, setDataListFriend] = useState<Array<InfoFriend>>(listFriend);
  const [searchFriend, setSearchFriend] = useState<string>("");

  useEffect(() => {
    if (searchFriend) {
      setDataListFriend((prev) => prev.filter((item) => item.username.search(searchFriend) !== -1));
    } else {
      setDataListFriend(listFriend);
    }
  }, [searchFriend]);

  return (
    <div>
      <div className="background-image"></div>
      <div className="default-chat">
        <div className="wrapper-sidebar-chat">
          <span>
            <Link to={"/dashboard"} style={{ fontSize: "35px" }}>
              <RiArrowLeftSLine></RiArrowLeftSLine>
            </Link>
            <span style={{ fontFamily: "math", fontWeight: "600", fontSize: "25px" }}>Chats</span>
          </span>

          <Input placeholder="Search..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchFriend(e.target.value)} />

          <ul className="list-friend">
            {dataListFriend.map((item) => (
              <li
                key={item.id}
                onClick={() => {
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Chọn để chat với bạn bè của bạn.
        </div>
      </div>
    </div>
  );
};

export default ChatDefault;
