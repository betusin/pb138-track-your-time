export const Profile = () => {
  return (
    <>
      <div className="profile-header">
        <h1>Profile</h1>
        <img src="/assets/edit-lime.svg" alt="edit" />
      </div>
      <img src="logo" alt="logo" />
      <span>Name surname</span>
      <span>Company name</span>
      <span>email</span>
      <button>Sign out</button>
    </>
  );
};
