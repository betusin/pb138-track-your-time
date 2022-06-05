import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom } from "../../state/atom";
import { IFormRegisterInput, RegisterForm } from "./AuthForm";

export const Register = () => {
  const setToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormRegisterInput> = async (
    data: IFormRegisterInput
  ) => {

    setToken("tokenTODO");

    navigate("/");
  };

  return (
    <div className="App">
      <h1>TrackYourTime</h1>
      <RegisterForm onSubmit={onSubmit} />
      Already have an account? Login <Link to="/login">here</Link>.
    </div>
  );
};
