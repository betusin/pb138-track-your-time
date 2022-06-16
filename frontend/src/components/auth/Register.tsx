import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authControllerLogin } from "../../api/authentication/authentication";
import { userControllerCreate } from "../../api/users/users";
import { accessTokenAtom } from "../../state/atom";
import { IFormRegisterInput, RegisterForm } from "./AuthForm";
import { useApiCall } from "../../util/api-caller";
import { AccessTokenDto } from "../../api/model";
import toast from "react-hot-toast";
import { Trans } from "react-i18next";
import i18n from "i18next";
import { PageSection } from "../common/PageSection";

export const Register = () => {
  const setToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();
  const doApiCall = useApiCall();

  function register(data: IFormRegisterInput) {
    if (!data.logo) data.logo = "";
    doApiCall(
      userControllerCreate,
      data,
      () => onRegisterSuccess(data),
      onRegisterFailure
    );
  }

  function onRegisterSuccess(data: IFormRegisterInput) {
    doApiCall(authControllerLogin, data, onLoginSuccess, undefined, {
      withCredentials: true,
      validateStatus: () => true,
    });
  }

  function onRegisterFailure(code: number) {
    if (code == 400) {
      toast(i18n.t("error.validation_failed"));
      return true;
    } else if (code == 409) {
      toast(i18n.t("error.already_exists"));
      return true;
    }
    return false;
  }

  function onLoginSuccess(data: AccessTokenDto) {
    setToken(data.accessToken);
    navigate("/");
  }

  return (
    <div className="page">
      <PageSection title="">
        <div className="auth-form--container">
          <RegisterForm onSubmit={register} />
          <span>
            <Trans i18nKey="auth.login.hint.existing_account" />
            <Link to="/login">
              <Trans i18nKey="auth.login.hint.here" />
            </Link>
            .
          </span>
        </div>
      </PageSection>
    </div>
  );
};
