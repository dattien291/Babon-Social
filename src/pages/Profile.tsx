import React, { useState, useEffect, useRef, useContext } from "react";
import "../styles/profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Modal } from "antd";
import { UploadOutlined, LeftOutlined } from "@ant-design/icons";
import { updateInfo } from "../store/authSlice";
import { Link, useParams } from "react-router-dom";
import { RiSettings5Fill, RiUserFollowFill } from "react-icons/ri";
import getRoundedCanvas from "../utils/Cropper";
import CoverPicture from "../components/CoverPicture/CoverPicture";
import { User, getUserWithUsername, updateAvatar } from "../assets/fake-data/User";
import { updateProfile } from "../store/profileSlice";
import { ThemeContext } from "../contexts/Theme";
import Snow from "../components/UI/Snow/Snow";
import TabProfile from "../components/UI/TabProfile/TabProfile";
import TabPhotos from "../components/UI/TabPhotos/TabPhotos";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  //=======Client State
  const { theme } = useContext(ThemeContext);
  const username = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const refImageEdit = useRef<HTMLImageElement>(null);

  // const [cropper, setCropper] = useState<any>();
  let cropper: any = null;
  const [profileTabs, setProfileTabs] = useState<string>("profile");
  //=======Server State
  const dataUser = useSelector((state: RootState) => state.auth);
  const [previewInModal, setPreviewInModal] = useState<string>(dataUser.dataUser.avatar);
  const dataProfile = useSelector((state: RootState) => state.profile);
  const [stateUserProfile, setStateUserProfile] = useState<User>({
    id: "",
    name: "",
    username: "",
    password: "",
    avatar: "",
    bio: "",
    coverPicture: { url: "", blurHash: "" },
  });

  useEffect(() => {
    if (dataUser.dataUser.username === username.username) {
      dispatch(updateProfile({ isMyProfile: true, dataProfile: username.username }));
    } else {
      dispatch(updateProfile({ isMyProfile: false, dataProfile: username.username as string }));
    }
  }, [username.username]);

  useEffect(() => {
    const fetchApiUser = async () => {
      const res = await getUserWithUsername(dataProfile.dataProfile);
      if (res) {
        setStateUserProfile(res);
      } else setStateUserProfile({ id: "", name: "", username: "", password: "", avatar: "", bio: "" });
    };

    fetchApiUser();
  }, [dataProfile.dataProfile]);

  useEffect(() => {
    if (!previewInModal) return;

    if (refImageEdit.current) {
      cropper = new Cropper(refImageEdit.current, {
        aspectRatio: 1 / 1,
        autoCropArea: 1,
        viewMode: 1,
      });
    }
  }, [previewInModal]);

  const handleOnChangeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    file && setPreviewInModal(URL.createObjectURL(file));
  };

  const handleSubmitInfo = async () => {
    if (previewInModal) {
      const croppedCanvas = cropper?.getCroppedCanvas();
      const roundedCanvas = getRoundedCanvas(croppedCanvas).toDataURL();
      await updateAvatar(stateUserProfile.id, roundedCanvas); //update in DB
      setStateUserProfile({ ...stateUserProfile, avatar: roundedCanvas }); //update in state local

      dispatch(updateInfo({ avatar: roundedCanvas })); // update User Redux is logging
    }
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className={`background-image ${theme ? "dark-bg" : ""}`}>{theme && <Snow />}</div>
      <CoverPicture picture={stateUserProfile.coverPicture || { url: "/coverimageprofile.jpg", blurHash: "" }} />
      <div className="wrapper-profile">
        <Link to="/dashboard" className="back-to-dashboard">
          <LeftOutlined />
        </Link>
        <div className="profile-information" style={{ color: `${theme ? "white" : "black"}` }}>
          <div className="profile-information-sticky">
            <div className="user-infomation">
              <div className="avatar-group">
                <div className="avatar-friend" onClick={() => setIsModalOpen(true)}>
                  {stateUserProfile.avatar ? (
                    <img src={stateUserProfile.avatar} draggable="false" />
                  ) : (
                    stateUserProfile.name.slice(0, 2).toLocaleUpperCase()
                  )}
                </div>
                <div className="info-group">
                  <span className="username">{stateUserProfile.name}</span>
                  <span className="friend-value" style={{ fontWeight: "600" }}>
                    {stateUserProfile.friend?.length} friends
                  </span>
                  <ul className="list-friend-profile">
                    {stateUserProfile.friend &&
                      stateUserProfile.friend.map(
                        (item, index) =>
                          index < 7 && (
                            <li key={item.username}>
                              <div className="avatar-friend">
                                <img src={item.avatar} alt="" />
                              </div>
                            </li>
                          )
                      )}
                  </ul>
                </div>
              </div>

              {isModalOpen && (
                <Modal
                  title="Edit profile"
                  className={`modal-edit-profile ${theme && "modal-dark"}`}
                  open={isModalOpen}
                  onCancel={() => {
                    setIsModalOpen(!isModalOpen);
                    setPreviewInModal("");
                  }}
                  onOk={handleSubmitInfo}
                >
                  {dataUser.dataUser.username === username.username && (
                    <label
                      htmlFor="upLoadAva"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <UploadOutlined />
                      Upload
                    </label>
                  )}
                  <input id="upLoadAva" type="file" onChange={handleOnChangeUpload} />
                  {previewInModal && dataProfile.isMyProfile ? (
                    <img src={previewInModal} style={{ maxWidth: "100%" }} ref={refImageEdit} />
                  ) : (
                    <div>
                      {stateUserProfile.avatar ? (
                        <img src={stateUserProfile.avatar} style={{ maxWidth: "100%" }} />
                      ) : (
                        stateUserProfile.name.slice(0, 2).toLocaleUpperCase()
                      )}
                    </div>
                  )}
                </Modal>
              )}

              {dataUser.dataUser.username === username.username ? (
                <button
                  className="button-edit-profile"
                  onClick={() => setIsModalOpen(true)}
                  style={{ backgroundColor: `${theme ? "#1f1f1f" : "#d3d3d3"}`, color: `${theme ? "white" : "black"}` }}
                >
                  <RiSettings5Fill></RiSettings5Fill> <span>Edit profile</span>
                </button>
              ) : (
                <button
                  className="button-edit-profile"
                  style={{ backgroundColor: `${theme ? "#1f1f1f" : "#d3d3d3"}`, color: `${theme ? "white" : "black"}` }}
                >
                  <RiUserFollowFill></RiUserFollowFill> Friends
                </button>
              )}
            </div>

            <div className={`btn-group ${theme && "dark"}`}>
              <button
                className={profileTabs === "profile" ? "tab-profile-active" : ""}
                style={{ color: `${theme ? "white" : "black"}` }}
                onClick={() => setProfileTabs("profile")}
              >
                Profile
              </button>
              <button
                className={profileTabs === "photos" ? "tab-profile-active" : ""}
                style={{ color: `${theme ? "white" : "black"}` }}
                onClick={() => setProfileTabs("photos")}
              >
                Photos
              </button>
            </div>
          </div>
        </div>
        {profileTabs === "profile" && <TabProfile stateUserProfile={stateUserProfile} />}
        {profileTabs === "photos" && <TabPhotos />}
      </div>
    </section>
  );
};

export default Profile;
