import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authControllerLogin } from "../../api/authentication/authentication";
import { userControllerCreate } from "../../api/users/users";
import { accessTokenAtom } from "../../state/atom";
import { useApiCall } from "../../util/api-caller";
import { AccessTokenDto } from "../../api/model";
import toast from "react-hot-toast";
import { RegisterForm, RegisterFormData } from "./RegisterForm";

export const Register = () => {
  const setToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();
  const doApiCall = useApiCall();

  function register(data: RegisterFormData) {
    if (!data.logo) data.logo = "/assets/company-logo.svg";
    doApiCall(
      userControllerCreate,
      data,
      () => onRegisterSuccess(data),
      onRegisterFailure
    );
  }

  function onRegisterSuccess(data: RegisterFormData) {
    doApiCall(authControllerLogin, data, onLoginSuccess);
  }

  function onRegisterFailure(code: number) {
    if (code == 400) {
      toast("Field validation failed.");
      return true;
    } else if (code == 409) {
      toast("A user with this email already exists.");
      return true;
    }
    return false;
  }

  function onLoginSuccess(data: AccessTokenDto) {
    setToken(data.accessToken);
    navigate("/");
  }

  return (
    <>
      <h1>TrackYourTime</h1>
      <RegisterForm onSubmit={register} />
      Already have an account? Login <Link to="/login">here</Link>.
    </>
  );
};
