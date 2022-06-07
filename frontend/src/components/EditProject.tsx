import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../static/projects";
import { IFormProjectInput } from "./CreateProject";
import { Navbar } from "./Navbar";
import { ProjectFormElems } from "./ProjectFormElems";

export const EditProject = () => {
  const projectData = projectsData[3]; // TODO fetch the real data

  const [resetedForm, setResetedForm] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, reset } =
    useForm<IFormProjectInput>();

  const onSubmit: SubmitHandler<IFormProjectInput> = (
    data: IFormProjectInput
  ) => {
    console.log(data);
    window.alert("data would be overwritten");

    navigate("/");
  };

  if (!resetedForm) {
    console.log(projectData);
    reset(projectData);
    setResetedForm(true);
  }

  return (
    <div className="App">
      <Navbar />
      <form className="m1" onSubmit={handleSubmit(onSubmit)}>
        <ProjectFormElems
          formState={formState}
          register={register}
          buttonText="Edit project"
        />
      </form>
    </div>
  );
};
