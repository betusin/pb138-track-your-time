import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom } from "../../state/atom";
import { IFormLoginInput, LoginForm } from "./AuthForm";
import { authControllerLogin } from "../../api/authentication/authentication";
import toast from "react-hot-toast";
import { AccessTokenDto } from "../../api/model";
import { useApiCall } from "../../util/api-caller";
import { Trans } from "react-i18next";
import i18n from "i18next";

export const Login = () => {
  const setToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();
  const doApiCall = useApiCall();

  function onLoginSuccess(result: AccessTokenDto): void {
    setToken(result.accessToken);
    navigate("/");
  }

  function onLoginFailure(code: number): boolean {
    switch (code) {
      case 401:
        toast(i18n.t("auth.login.password_incorrect"));
        return true;
      case 404:
        toast(i18n.t("auth.login.user_not_found"));
        return true;
      default:
        return false;
    }
  }

  function login(data: IFormLoginInput) {
    doApiCall(authControllerLogin, data, onLoginSuccess, onLoginFailure, {
      withCredentials: true,
    });
  }

  return (
    <>
      <h1>
        <Trans i18nKey="app.name" />
      </h1>
      <LoginForm onSubmit={login} />
      <Trans i18nKey="auth.register.hint.no_account" />
      <Link to="/register">
        <Trans i18nKey="auth.register.hint.here" />
      </Link>
      .
    </>
  );
};
