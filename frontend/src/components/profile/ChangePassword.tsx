import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UpdateUserPasswordDto } from "../../api/model";
import { meControllerPassword } from "../../api/users/users";
import i18n from "../../i18n/i18n";
import { useApiCall } from "../../util/api-caller";
import { Page } from "../common/PageContent";
import { PageSection } from "../common/PageSection";
import {
  ChangePasswordForm,
  IFormChangePasswordInput,
} from "./ChangePasswordForm";

export const ChangePassword = () => {
  const doApiCall = useApiCall();
  const navigate = useNavigate();

  const changePassword = (data: IFormChangePasswordInput) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error(i18n.t("profile.passwords_no_match"));
      return;
    }

    const updatePasswordData: UpdateUserPasswordDto = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    doApiCall(
      meControllerPassword,
      updatePasswordData,
      onChangePasswordSuccess,
      onChangePasswordFailure
    );
  };

  const onChangePasswordSuccess = () => {
    toast.success(i18n.t("profile.password_changed"));
    navigate("/me");
  };

  const onChangePasswordFailure = (code: number) => {
    if (code === 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    } else if (code === 403) {
      toast.error(i18n.t("auth.login.password_incorrect"));
      return true;
    }
    return false;
  };

  return (
    <Page title={i18n.t("profile.change_password")}>
      <PageSection title="">
        <ChangePasswordForm onSubmit={changePassword} />
      </PageSection>
    </Page>
  );
};
