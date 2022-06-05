import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom } from "../../state/atom";
import { IFormLoginInput, LoginForm } from "./AuthForm";
import { authControllerLogin } from "../../api/authentication/authentication";

export const Login = () => {
  const setToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormLoginInput> = async (
    data: IFormLoginInput
  ) => {
    const result = await authControllerLogin({ ...data });
    if (result.status == 201) {
      setToken(result.data.access_token);
      navigate("/");
    } else if (result.status == 401) {
      alert("Incorrect email or password!");
    } else {
      alert("Unknown error: " + result.statusText);
    }
  };

  return (
    <div className="App">
      <h1>TrackYourTime</h1>
      <LoginForm onSubmit={onSubmit} />
      Don&apos;t have an account yet? Register <Link to="/register">here</Link>.
    </div>
  );
};
