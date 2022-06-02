import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { SessionFormElems } from './SessionFormElems';

export interface IFormSessionInput {
  fromDate: Date,
  toDate: Date,
  isInvoiced: boolean,
  hourly_rate: number,
  note: string,
}

const blankSession = {
  fromDate: new Date(),
  toDate: new Date(),
  isInvoiced: false,
  hourly_rate: 0, // TODO hourly_rate from poject
  note: "",
}

export const CreateSession = () => {
  const navigate = useNavigate();
  const projectID = "randomID";

  const {
    register,
    handleSubmit,
    formState,
  } = useForm<IFormSessionInput>();

  const onSubmit= (data: IFormSessionInput) => {
    console.log(data)
    window.alert("new session would be created with data: ");

    navigate('/project/'+ projectID);
  };

  return (
    <div className="App">
      <Navbar />
      <form className='m1' onSubmit={handleSubmit(onSubmit)}>
        <SessionFormElems formState={formState} register={register} sessionData={blankSession} buttonText="Create session" />
      </form>
    </div>
  );
}