import { Avatar, KaImage } from "@/components/primitive";
import { logout } from "@/store/auth/authSlice";
import { selectUserInfo } from "@/store/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import classNames from "classnames";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "@/contexts/Theme";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <aside className={classNames("sidebar", { "-dark": theme })}>
      <div className="sticky">
        <div className="logo">
          <KaImage src="/logo-gradient.svg" objectFit="contain" />
        </div>

        <div className="navigation">
          <div className="avatar" onClick={() => navigate(`/profile/${userInfo?.username}`)}>
            <Avatar src={userInfo?.avatar || ""} size="md" objectFit="cover" />
          </div>

          <div className="menu">
            <Link to="/" className="action">
              <i className="fa-regular fa-house" />
            </Link>

            <Link to="/" className="action">
              <i className="fa-regular fa-messages" />
            </Link>

            <Link to={`/profile/${userInfo?.username}`} className="action">
              <i className="fa-regular fa-gear" />
            </Link>

            <div className="action" onClick={() => dispatch(logout())}>
              <i className="fa-regular fa-right-from-bracket" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
