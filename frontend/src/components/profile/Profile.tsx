import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authControllerLogout } from "../../api/authentication/authentication";
import { accessTokenAtom } from "../../state/atom";
import { useApiCall } from "../../util/api-caller";
import { useLoadProfile } from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import "../../styles/Profile.css";
import { ScreenTitle } from "../common/ScreenTitle";
import i18n from "../../i18n/i18n";
import { Stack } from "@mui/material";
import { toast } from "react-hot-toast";
import { ProfileActions } from "./ProfileActions";
import { PageSection } from "../common/PageSection";

export const Profile = () => {
  const doApiCall = useApiCall();

  const [profile] = useLoadProfile();

  const backupImageURL =
    "https://uxwing.com/wp-content/themes/uxwing/download/42-business-professional-services/company-enterprise.svg";

  const navigate = useNavigate();
  const setToken = useSetRecoilState(accessTokenAtom);

  if (profile === undefined) {
    return <LoadingPlaceholder />;
  }

  const onLougoutSuccess = () => {
    setToken("");
    toast.success(i18n.t("profile.signed_out"));
    navigate("/login");
  };

  const signOut = () => {
    doApiCall(
      authControllerLogout,
      { withCredentials: true },
      onLougoutSuccess
    );
  };

  return (
    <div className="page">
      <ScreenTitle title={i18n.t("app.profile")}>
        <ProfileActions />
      </ScreenTitle>
      <PageSection title="">
        <div className="profile-wrapper">
          <Stack>
            <div className="profile__logo-wrapper">
              <img
                className="profile__logo-img"
                src={profile.logo ?? backupImageURL}
                onError={({ currentTarget }) => {
                  if (currentTarget.src != backupImageURL) {
                    currentTarget.src = backupImageURL;
                  }
                }}
                alt="logo"
              />
            </div>
            <div className="profile-field profile__name">
              <p className="profile-field__label">
                <Trans i18nKey="profile.name" />
              </p>
              <p className="profile-field__value">
                {profile.name} {profile.surname}
              </p>
            </div>
            <div className="profile-field profile__company">
              <p className="profile-field__label">
                <Trans i18nKey="profile.company_name" />
              </p>
              <p className="profile-field__value">{profile.company}</p>
            </div>
            <div className="profile-field profile__email">
              <p className="profile-field__label">
                <Trans i18nKey="profile.email" />
              </p>
              <p className="profile-field__value">{profile.email}</p>
            </div>
            <div className="btn-wrapper btn-profile-wrapper">
              <button className="btn btn--primary" onClick={signOut}>
                <Trans i18nKey="profile.sign_out" />
              </button>
            </div>
          </Stack>
        </div>
      </PageSection>
    </div>
  );
};
