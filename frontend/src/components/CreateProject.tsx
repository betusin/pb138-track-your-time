import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ProjectFormElems } from './ProjectFormElems';

export interface IFormProjectInput {
  name: string,
  customer: string,
  isActive: boolean,
  hourly_rate: number,
}

const blankProject = {
  name: "",
  customer: "",
  isActive: true,
  hourly_rate: 0,
}

export const CreateProject = () => {
  const [ submitted, setSubmitted ] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm<IFormProjectInput>();

  const onSubmit: SubmitHandler<IFormProjectInput> = (data: IFormProjectInput) => {
    console.log(data)
    setSubmitted(true);
    window.alert("new project would be created with data: ");

    navigate("/");
  };

  if (!submitted) {
    reset(blankProject)
  };

  return (
    <div className="App">
      <Navbar />
      {!submitted &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProjectFormElems formState={formState} register={register} buttonText="Create project" />
        </form>
      }
    </div>
  );
}