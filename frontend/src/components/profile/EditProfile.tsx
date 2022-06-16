import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { meControllerUpdate } from "../../api/me/me";
import i18n from "../../i18n/i18n";
import { useApiCall } from "../../util/api-caller";
import { useLoadProfile } from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { Page } from "../common/PageContent";
import { PageSection } from "../common/PageSection";
import { ScreenTitle } from "../common/ScreenTitle";
import { EditProfileForm, IFormEditProfileInput } from "./EditProfileForm";

export const EditProfile = () => {
  const [profile] = useLoadProfile();
  const doApiCall = useApiCall();
  const navigate = useNavigate();

  const updateUser = (data: IFormEditProfileInput) => {
    if (!data.logo) data.logo = "";
    doApiCall(meControllerUpdate, data, onUpdateSuccess, onUpdateFailure);
  };

  const onUpdateSuccess = () => {
    toast.success(i18n.t("profile.updated"));
    navigate("/me");
  };

  const onUpdateFailure = (code: number) => {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    }
    return false;
  };

  if (profile === undefined) {
    return <LoadingPlaceholder />;
  }

  return (
    <Page
      title={i18n.t("profile.edit_profile")}
      secondaryTitle={`${profile.name} ${profile.surname}`}
    >
      <PageSection title="">
        <EditProfileForm profile={profile} onSubmit={updateUser} />
      </PageSection>
    </Page>
  );
};
