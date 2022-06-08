import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CreateProjectDto } from "../api/model";
import { projectControllerCreate } from "../api/projects/projects";
import { accessTokenAtom } from "../state/atom";
import {
  failedValidationText,
  MessageFailBlock,
  MessageSuccessBlock,
  unauthorizedText,
} from "./Messages";
import { Navbar } from "./Navbar";
import { ProjectFormElems } from "./ProjectFormElems";

export interface IFormProjectInput {
  name: string;
  customer: string;
  isActive?: boolean;
  hourlyRate: number;
}

export const CreateProject = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenAtom);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { register, handleSubmit, formState } = useForm<IFormProjectInput>();

  const onSubmit: SubmitHandler<IFormProjectInput> = async (
    data: IFormProjectInput
  ) => {
    const header = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const dataForCreate: CreateProjectDto = {
      name: data.name,
      hourlyRate: data.hourlyRate,
      customer: data.customer,
    };

    const result = await projectControllerCreate(dataForCreate, header);
    if (result.status == 201) {
      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else if (result.status == 400) {
      setErrorMessage(failedValidationText);
    } else if (result.status == 401) {
      setErrorMessage(unauthorizedText);
    }
  };

  return (
    <div className="App">
      <Navbar />
      {errorMessage && <MessageFailBlock text={errorMessage} />}
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
