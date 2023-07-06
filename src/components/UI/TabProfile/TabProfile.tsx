import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/Theme";
import { useParams } from "react-router-dom";
import useListPostProfile from "../../../hooks/useListPostsProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CreatePost from "../../CreatePost/CreatePost";
import ListPosts from "../../ListPosts/ListPosts";
import TextArea from "antd/es/input/TextArea";
import { User } from "../../../assets/fake-data/User";
import { RiEdit2Fill } from "react-icons/ri";
import SuggestionList from "../SuggestionList/SuggestionList";
import ListPostsSkeleton from "../../ListPosts/ListPostsSkeleton";

interface TabProfileProps {
  stateUserProfile: User;
}

const TabProfile: React.FC<TabProfileProps> = ({ stateUserProfile }) => {
  const { theme } = useContext(ThemeContext);
  const [stateTextAreaBio, setStateTextAreaBio] = useState<boolean>(false);
  const username = useParams();
  const dataProfile = useSelector((state: RootState) => state.profile);
  const { isLoading, listPosts } = useListPostProfile(username.username);
  const [bio, setBio] = useState<string>("");
  return (
    <div className="profile-content-group">
      <div className="profile-post">
        {dataProfile.isMyProfile && <CreatePost />}
        {isLoading && <ListPostsSkeleton seeMoreRef={null} />}
        {listPosts.length !== 0 && <ListPosts />}
        {listPosts.length === 0 && !isLoading && <span className={`no-post ${theme && "dark"}`}>There are no posts...</span>}
      </div>

      <div className="profile-suggestion">
        <div style={{ position: "sticky", top: "10px" }}>
          <div className={`profile-intro ${theme && "dark"}`}>
            <span className="trending-title">Intro</span>
            {stateTextAreaBio ? (
              <TextArea
                className="input-bio"
                placeholder="Describe who you are"
                value={bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
              />
            ) : (
              <span style={{ textAlign: "center" }}>{stateUserProfile.bio}</span>
            )}

            {dataProfile.isMyProfile ? (
              stateTextAreaBio ? (
                <div className="btn-group1">
                  <button
                    onClick={() => {
                      // setBio(dataProfile.dataProfile.bio);
                      setStateTextAreaBio(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setStateTextAreaBio(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                  className="edit-bio"
                  onClick={() => setStateTextAreaBio(true)}
                >
                  <RiEdit2Fill></RiEdit2Fill>
                </span>
              )
            ) : (
              ""
            )}
          </div>

          <SuggestionList />
        </div>
      </div>
    </div>
  );
};

export default TabProfile;
