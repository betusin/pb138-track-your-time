import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom } from "../../state/atom";
import { useLoadProfile } from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";

export const Profile = () => {
  // const doApiCall = useApiCall();

  const [profile] = useLoadProfile();

  const navigate = useNavigate();
  const setToken = useSetRecoilState(accessTokenAtom);

  if (profile === undefined) {
    return <LoadingPlaceholder />;
  }

  const signOut = () => {
    setToken("");
    navigate("/login");
  };

  return (
    <>
      <div className="profile-header">
        <h1 className="profile-header__title">Profile</h1>
        <Link to="/me/edit">
          <img
            className="icon profile-header__icon"
            src="/assets/edit-lime.svg"
            alt="edit"
          />
        </Link>
      </div>
      <img className="profile__logo" src={profile.logo} alt="logo" />
      <div className="profile__name">
        `{profile.name} {profile.surname}`
      </div>
      <div className="profile__company">{profile.company}</div>
      <div className="profile__email">{profile.email}</div>
      <button className="btn btn--primary" onClick={signOut}>
        Sign out
      </button>
    </>
  );
};
