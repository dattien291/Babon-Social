import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/Theme";
import { useParams } from "react-router-dom";
import useListPostProfile from "../../../hooks/useListPostsProfile";
import "./tabphotos.scss";
import ModalPreview from "../../ListPosts/ModalPreview/ModalPreview";
import { Post } from "../../../assets/fake-data/Posts";

const TabPhotos: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const username = useParams();
  const { listPosts, isLoading } = useListPostProfile(username.username);
  const [modalPreview, setModalPreview] = useState<boolean>(false);
  const [postSelected, setPostSelected] = useState<Post>();
  console.log(listPosts);
  return (
    <div className={`profile-intro ${theme && "dark"}`}>
      <span className="trending-title">Photos</span>

      {modalPreview && (
        <ModalPreview
          open={modalPreview}
          setOpenModalPreview={setModalPreview}
          dataModalPreview={{ index: 0, post: postSelected as Post }}
        />
      )}

      {isLoading ? (
        <ul className="list-photos-profile photos-skeleton">
          <li className="photo-item"></li>
          <li className="photo-item"></li>
          <li className="photo-item"></li>
        </ul>
      ) : (
        <ul className="list-photos-profile">
          {listPosts.map(
            (post) =>
              post.image[0] && (
                <li
                  className="photo-item"
                  onClick={() => {
                    setModalPreview(true), setPostSelected(post);
                  }}
                >
                  <img src={post.image[0].url} />
                  {post.image.length > 1 && <span className="multi-photos"></span>}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default TabPhotos;
