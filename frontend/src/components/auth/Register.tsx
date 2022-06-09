import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authControllerLogin } from "../../api/authentication/authentication";
import { userControllerCreate } from "../../api/users/users";
import { accessTokenAtom } from "../../state/atom";
import { IFormRegisterInput, RegisterForm } from "./AuthForm";

export const Register = () => {
  const setToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormRegisterInput> = async (
    data: IFormRegisterInput
  ) => {
    if (!data.logo) data.logo = "/assets/company-logo.svg";

    const result = await userControllerCreate({ ...data });
    if (result.status == 201) {
      const resultLogin = await authControllerLogin({ ...data });
      if (resultLogin.status == 201) {
        setToken(resultLogin.data.access_token);
        navigate("/");
      } else if (resultLogin.status == 401) {
        alert("Incorrect email or password!");
      } else {
        alert("Unknown error: " + resultLogin.statusText);
      }
    } else if (result.status == 400) {
      alert("Field validation failed");
    } else if (result.status == 409) {
      alert("A user with this email already exists");
    } else {
      alert("Unknown error: " + result.statusText);
    }
  };

  return (
    <>
      <h1>TrackYourTime</h1>
      <RegisterForm onSubmit={onSubmit} />
      Already have an account? Login <Link to="/login">here</Link>.
    </>
  );
};
