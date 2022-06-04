import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { accessTokenAtom } from '../../state/atom';
import { AuthForm, IFormAuthInput } from './AuthForm';

export const Register = () => {
  const setToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormAuthInput> = (
    data: IFormAuthInput
  ) => {
    console.log(data);
    window.alert("you would be registered in");

    setToken('tokenTODO');

    navigate("/");
  };

  return (
    <div className="App">
      <h1>TrackYourTime</h1>
      <AuthForm onSubmit={onSubmit} buttonText="Register" />
    </div>
  );
}