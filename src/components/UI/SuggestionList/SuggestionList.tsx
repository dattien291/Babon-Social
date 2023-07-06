import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./suggestionlist.scss";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../store/profileSlice";
import { PostTrending, getListUserSuggest } from "../../../assets/fake-data/ListUserSuggest";
import { ThemeContext } from "../../../contexts/Theme";

const SuggestionList: React.FC = () => {
  const dispath = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [listUserSuggest, setListUserSuggest] = useState<PostTrending[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListUserSuggest();
      setListUserSuggest(res);
    };

    fetchApi();
  }, []);

  const handleClickProfile = (username: string) => {
    dispath(updateProfile({ isMyProfile: false, dataProfile: username }));
  };

  return (
    <section className={`trending-feeds ${theme && "dark"}`}>
      <span className="trending-title">Suggestion for you 💖💖</span>
      <ul className="list-suggest">
        {listUserSuggest.map((item) => (
          <Link key={item.id} to={`/profile/${item.username}`} onClick={() => handleClickProfile(item.username)}>
            <div className="avatar-friend">
              {item.avatar ? <img src={item.avatar} /> : item.name.slice(0, 2).toLocaleUpperCase()}
            </div>
            <span className="name">{item.name}</span>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default SuggestionList;
