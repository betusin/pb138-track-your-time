import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectControllerFindOne } from "../api/projects/projects";
import { IFormProjectInput } from "./CreateProject";
import { failedValidationText, noProjectFoundText } from "./Messages";
import { ProjectFormElems } from "./ProjectFormElems";
import { useApiCall, useApiSwrCall } from "../util/api-caller";
import { projectControllerUpdateWrap } from "../util/api-call-wrappers";

export const EditProject = () => {
  const apiCall = useApiCall();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } =
    useForm<IFormProjectInput>();
  const { id: projectIDParam } = useParams();
  const projectID = projectIDParam ?? "";
  const { data } = useApiSwrCall((o) => {
    return useProjectControllerFindOne(projectID, o);
  });
  useEffect(() => {
    if (data?.status == 404) toast.error(noProjectFoundText);
    if (data?.data.customer) {
      setValue("customer", data.data.customer);
      setValue("hourlyRate", data.data.hourlyRate);
      setValue("isActive", data.data.isActive);
      setValue("name", data.data.name);
    }
  }, [data]);

  function updateProject(data: IFormProjectInput) {
    const body = {
      name: data.name,
      hourlyRate: data.hourlyRate,
      customer: data.customer,
      isActive: data.isActive,
    };
    apiCall(projectControllerUpdateWrap(projectID), body, onSuccess, onError);
  }

  function onSuccess() {
    toast.success("Project was successfully updated.");
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
      <form className="m1" onSubmit={handleSubmit(updateProject)}>
        <ProjectFormElems
          formState={formState}
          register={register}
          buttonText="Edit project"
        />
      </form>
    </>
  );
};
