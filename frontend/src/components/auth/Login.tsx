import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom } from "../../state/atom";
import { IFormLoginInput, LoginForm } from "./AuthForm";
import { authControllerLogin } from "../../api/authentication/authentication";
import toast from "react-hot-toast";
import { AccessTokenDto } from "../../api/model";
import { useApiCall } from "../../util/api-caller";

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
        toast("Incorrect password.");
        return true;
      case 404:
        toast("No such user found.");
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
      <h1>TrackYourTime</h1>
      <LoginForm onSubmit={login} />
      Don&apos;t have an account yet? Register <Link to="/register">here</Link>.
    </>
  );
};
