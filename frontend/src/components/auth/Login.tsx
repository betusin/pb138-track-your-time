import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom } from "../../state/atom";
import { AuthForm, IFormAuthInput } from "./AuthForm";
import { authControllerLogin } from "../../api/authentication/authentication";

export const Login = () => {
  const setToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormAuthInput> = async (
    data: IFormAuthInput
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
      <AuthForm onSubmit={onSubmit} buttonText="Login" />
      Don't have an account yet? Register <Link to="/register">here</Link>.
    </div>
  );
};
