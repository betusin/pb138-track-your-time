import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProjectFormElems } from "./ProjectFormElems";

export interface IFormProjectInput {
  name: string;
  customer: string;
  isActive: boolean;
  hourly_rate: number;
}

const blankProject = {
  name: "",
  customer: "",
  isActive: true,
  hourly_rate: 0,
};

export const CreateProject = () => {
  const [resetedForm, setResetedForm] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } =
    useForm<IFormProjectInput>();

  const onSubmit: SubmitHandler<IFormProjectInput> = (
    data: IFormProjectInput
  ) => {
    console.log(data);
    window.alert("new project would be created with data: ");

    navigate("/");
  };

  if (!resetedForm) {
    reset(blankProject);
    setResetedForm(true);
  }

  return (
    <>
      <form className="m1" onSubmit={handleSubmit(onSubmit)}>
        <ProjectFormElems
          formState={formState}
          register={register}
          buttonText="Create project"
        />
      </form>
    </>
  );
};
