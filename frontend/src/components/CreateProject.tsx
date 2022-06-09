import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CreateProjectDto } from "../api/model";
import { projectControllerCreate } from "../api/projects/projects";
import { accessTokenAtom } from "../state/atom";
import {
  failedValidationText,
  unauthorizedText,
  unexpectedErrorText,
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
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenAtom);

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
      toast.success("Project was successfully created.");
      navigate("/");
    } else if (result.status == 400) {
      toast.error(failedValidationText);
    } else if (result.status == 401) {
      toast.error(unauthorizedText);
    } else {
      toast.error(unexpectedErrorText);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Toaster />
      <form className="m1" onSubmit={handleSubmit(onSubmit)}>
        <ProjectFormElems
          formState={formState}
          register={register}
          buttonText="Create project"
        />
      </form>
    </div>
  );
};
