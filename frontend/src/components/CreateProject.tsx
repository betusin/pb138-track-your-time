import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { projectControllerCreate } from "../api/projects/projects";
import { failedValidationText } from "./Messages";
import { ProjectFormElems } from "./ProjectFormElems";
import { useApiCall } from "../util/api-caller";

export interface IFormProjectInput {
  name: string;
  customer: string;
  isActive?: boolean;
  hourlyRate: number;
}

export const CreateProject = () => {
  const navigate = useNavigate();
  const doApiCall = useApiCall();

  const { register, handleSubmit, formState } = useForm<IFormProjectInput>();

  function createProject(data: IFormProjectInput) {
    const body = {
      name: data.name,
      hourlyRate: data.hourlyRate,
      customer: data.customer,
    };

    doApiCall(projectControllerCreate, body, onSuccess, onError);
  }

  function onSuccess() {
    toast.success("Project was successfully created.");
    navigate("/");
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(failedValidationText);
      return true;
    }
    return false;
  }

  return (
    <>
      <form className="m1" onSubmit={handleSubmit(createProject)}>
        <ProjectFormElems
          formState={formState}
          register={register}
          buttonText="Create project"
        />
      </form>
    </>
  );
};
