import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { projectControllerCreate } from "../api/projects/projects";
import { accessTokenAtom } from "../state/atom";
import {
  MessageFailedValidation,
  MessageSuccessBlock,
  MessageUnauthorized,
} from "./Messages";
import { Navbar } from "./Navbar";
import { ProjectFormElems } from "./ProjectFormElems";

export interface IFormProjectInput {
  name: string;
  customer: string;
  isActive?: boolean;
  hourlyRate: number;
}

const blankProject = {
  name: "",
  customer: "",
  isActive: true,
  hourlyRate: 0,
};

export const CreateProject = () => {
  const [resetedForm, setResetedForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenAtom);

  const { register, handleSubmit, formState, reset } =
    useForm<IFormProjectInput>();

  const onSubmit: SubmitHandler<IFormProjectInput> = async (
    data: IFormProjectInput
  ) => {
    const header = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    delete data.isActive;

    const result = await projectControllerCreate(data, header);
    if (result.status == 201) {
      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else if (result.status == 400) {
      return <MessageFailedValidation />;
    } else if (result.status == 401) {
      return <MessageUnauthorized />;
    }
  };

  if (!resetedForm) {
    reset(blankProject);
    setResetedForm(true);
  }

  return (
    <div className="App">
      <Navbar />
      {submitted ? (
        <MessageSuccessBlock text="Project was successfully created." />
      ) : (
        <form className="m1" onSubmit={handleSubmit(onSubmit)}>
          <ProjectFormElems
            formState={formState}
            register={register}
            buttonText="Create project"
          />
        </form>
      )}
    </div>
  );
};
