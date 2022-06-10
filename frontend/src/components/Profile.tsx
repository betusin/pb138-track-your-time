import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  const signOut = () => {
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
      <img className="profile__logo" src="logo" alt="logo" />
      <div className="profile__name">Name surname</div>
      <div className="profile__company">Company name</div>
      <div className="profile__email">email</div>
      <button className="btn" onClick={signOut}>
        Sign out
      </button>
    </>
  );
};
