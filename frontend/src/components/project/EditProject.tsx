import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IFormProjectInput } from "./CreateProject";
import { ProjectFormElems } from "./ProjectFormElems";
import { useApiCall } from "../../util/api-caller";
import { projectControllerUpdateWrap } from "../../util/api-call-wrappers";
import { useLoadProject } from "../../util/load-entity-wrappers";
import { useParamOrEmpty } from "../../util/params";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import i18n from "../../i18n/i18n";

export const EditProject = () => {
  const apiCall = useApiCall();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } =
    useForm<IFormProjectInput>();
  const projectID = useParamOrEmpty("id");
  const project = useLoadProject(projectID);
  useEffect(() => {
    if (project?.customer) {
      setValue("customer", project.customer);
      setValue("hourlyRate", project.hourlyRate);
      setValue("isActive", project.isActive);
      setValue("name", project.name);
    }
  }, [project]);

  if (project === undefined) {
    return <LoadingPlaceholder />;
  }

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
    toast.success(i18n.t("project.updated"));
    navigate("/");
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
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
          buttonText={i18n.t("project.edit")}
        />
      </form>
    </>
  );
};
