import React, { useContext, useEffect, useState } from "react";
import "./dashboardtrending.scss";
import { Link } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Switch } from "antd";
import { logout } from "../../../store/authSlice";
import SuggestionList from "../../UI/SuggestionList/SuggestionList";
import { updateProfile } from "../../../store/profileSlice";
import { RiSearchLine, RiNotification2Line } from "react-icons/ri";
import { Post, getRandomPosts } from "../../../assets/fake-data/Posts";
import ImageBlur from "../../ImageBlur/ImageBlur";
import ModalPreview from "../../ListPosts/ModalPreview/ModalPreview";
import { DataModalPreview } from "../../ListPosts/ListPosts";
import { User, getAllUsers } from "../../../assets/fake-data/User";
import useNavigateLocal from "../../../hooks/useNavigateLocal";
import { ThemeContext } from "../../../contexts/Theme";

const initialRanDomPost: Post = {
  id: "",
  name: "",
  username: "",
  text: "",
  like: false,
  image: [{ url: "", blurHash: "" }],
  createAt: "",
  comment: [],
  likeCount: 0,
};

const DashboardTrending: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext); // them context
  const dataUser = useSelector((state: RootState) => state.auth); //redux
  const navigate = useNavigateLocal();
  const dispath = useDispatch();
  const [inputSearch, setInputSearch] = useState<string>("");
  const [dataListFriend, setDataListFriend] = useState<User[]>([]);
  const [listFriend, setListFriend] = useState<User[]>([]);
  const [dataModalPreview, setDataModalPreview] = useState<DataModalPreview>({ post: initialRanDomPost });
  const [openModalPreview, setOpenModalPreview] = useState<boolean>(false);

  useEffect(() => {
    const fetchRandomPost = async () => {
      const res = await getRandomPosts();
      const resListUser = await getAllUsers();
      setListFriend(resListUser);
      setDataModalPreview({ ...dataModalPreview, post: res });
    };

    fetchRandomPost();
  }, []);

  const handleOnClickMyProfile = () => {
    dispath(
      updateProfile({
        isMyProfile: true,
        dataProfile: dataUser.dataUser.username,
      })
    );
  };

  const handleOnChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
    if (event.target.value) {
      setDataListFriend(
        listFriend.filter((item) => item.username.toLocaleLowerCase().search(event.target.value.toLocaleLowerCase()) !== -1)
      );
    } else {
      setDataListFriend([]);
    }
  };

  const handleShowProfileSearch = (infoFriendSelected: User) => {
    navigate.directional("/profile", {
      isMyProfile: false,
      dataProfile: infoFriendSelected.username,
    });
  };

  const handleNavigateProfile = () => {
    navigate.directional("/profile", {
      isMyProfile: false,
      dataProfile: dataModalPreview.post.username,
    });
  };

  const content: JSX.Element = (
    <div>
      <button style={{ fontSize: "15px", padding: "0px", height: "27.6px" }}>
        <Link
          to={`/profile/${dataUser.dataUser.username}`}
          style={{ textDecoration: "none", color: "black", padding: "5px" }}
          onClick={handleOnClickMyProfile}
        >
          Profile
        </Link>
      </button>
      <button style={{ fontSize: "15px" }} onClick={() => dispath(logout())}>
        Log out
      </button>
    </div>
  );

  const contentPopoverSearch: JSX.Element = (
    <div>
      <input
        type="text"
        className="popover-search"
        placeholder="Search..."
        onChange={handleOnChangeInputSearch}
        value={inputSearch}
      />
      <ul className="list-friend-search" style={{ display: `${dataListFriend.length > 0 ? "block" : "none"}` }}>
        <span style={{ fontSize: "16px", fontWeight: "600", margin: "5px 3px" }}>🔍 Recent searches</span>
        {dataListFriend.map((item) => (
          <li key={item.id} onClick={() => handleShowProfileSearch(item)}>
            <div className="avatar-friend">{item.avatar ? <img src={item.avatar} /> : item.name.slice(0, 2).toUpperCase()}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {item.name} <span style={{ fontSize: "13px", color: "gray" }}>Friend</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="trending">
      {openModalPreview && (
        <ModalPreview open={openModalPreview} setOpenModalPreview={setOpenModalPreview} dataModalPreview={dataModalPreview} />
      )}
      <nav className="navigation">
        <Switch onChange={() => setTheme(!theme)} checked={theme} />
        <div className="btn-group">
          <Popover placement="left" content={contentPopoverSearch} trigger="click">
            <button>
              <RiSearchLine></RiSearchLine>
            </button>
          </Popover>
          <Popover content={<p>Notifications</p>} trigger="click">
            <button>
              <RiNotification2Line style={{ fontSize: "18px" }}></RiNotification2Line>
            </button>
          </Popover>
        </div>
        <Popover content={content} trigger="click">
          <div className="avatar-friend">
            <span className="badge"></span>
            {dataUser.dataUser.avatar ? (
              <img src={dataUser.dataUser.avatar} />
            ) : (
              dataUser.dataUser.name.slice(0, 2).toLocaleUpperCase()
            )}
          </div>
        </Popover>
      </nav>

      <div style={{ position: "sticky", top: "-180px", left: "0px" }}>
        <section className={`trending-feeds ${theme && "dark"}`}>
          <span className="trending-title">Trending Feeds 😀😀</span>
          <div className="trending-feeds-item">
            <div className="trending-image" onClick={() => setOpenModalPreview(true)}>
              <ImageBlur picture={dataModalPreview.post.image[0] && dataModalPreview.post.image[0]} />
            </div>
            {/* <img src={randomPost.image[0] && randomPost.image[0].url} alt="" width="100%" style={{ borderRadius: "10px" }} /> */}
            <div className="trending-item-info" onClick={handleNavigateProfile}>
              <div className="avatar-friend">
                {dataModalPreview.post.avatar ? (
                  <img src={dataModalPreview.post.avatar} alt="" />
                ) : (
                  dataModalPreview.post.name.slice(0, 2).toLocaleUpperCase()
                )}
              </div>
              <span className="name-user" style={{ color: "rgb(7, 142, 200)" }}>
                {dataModalPreview.post?.name}
              </span>
            </div>
            <span>{dataModalPreview.post?.text}</span>
          </div>
        </section>

        <SuggestionList />
      </div>
    </div>
  );
};

export default DashboardTrending;
