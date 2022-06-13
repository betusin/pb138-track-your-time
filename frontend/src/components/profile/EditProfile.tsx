import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { meControllerUpdate } from "../../api/users/users";
import i18n from "../../i18n/i18n";
import { useApiCall } from "../../util/api-caller";
import { useLoadProfile } from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { ScreenTitle } from "../common/ScreenTitle";

export const EditProfile = () => {
  const [profile] = useLoadProfile();
  const doApiCall = useApiCall();
  const navigate = useNavigate();

  const updateUser = (data: any) => {
    if (!data.logo) data.logo = "";
    doApiCall(meControllerUpdate, data, onUpdateSuccess, onUpdateFailure);
  };

  const onUpdateSuccess = () => {
    toast.success(i18n.t("profile.updated"));
    navigate("/me");
  };

  function onUpdateFailure(code: number) {
    if (code == 400) {
      toast(i18n.t("error.validation_failed"));
      return true;
    }
    return false;
  }

  if (profile === undefined) {
    return <LoadingPlaceholder />;
  }

  return (
    <>
      <ScreenTitle
        title={i18n.t("profile.edit_profile")}
        secondaryTitle={`${profile.name} ${profile.surname}`}
      />
    </>
  );
};
