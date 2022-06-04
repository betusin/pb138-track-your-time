import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthForm, IFormAuthInput } from './AuthForm';

export const Register = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormAuthInput> = (
    data: IFormAuthInput
  ) => {
    console.log(data);
    window.alert("you would be registered in");

    navigate("/");
  };

  return (
    <div className="App">
      <h1>TrackYourTime</h1>
      <AuthForm onSubmit={onSubmit} buttonText="Register" />
    </div>
  );
}