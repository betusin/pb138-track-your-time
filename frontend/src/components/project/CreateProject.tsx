import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { projectControllerCreate } from "../../api/projects/projects";
import { ProjectFormElems } from "./ProjectFormElems";
import { useApiCall } from "../../util/api-caller";
import i18n from "../../i18n/i18n";
import { Page } from "../common/PageContent";
import { PageSection } from "../common/PageSection";

export interface IFormProjectInput {
  name: string;
  customer: string;
  isActive?: boolean;
  hourlyRate: number;
}

export const CreateProject = () => {
  const navigate = useNavigate();
  const doApiCall = useApiCall();

  const { register, handleSubmit, formState, control, reset } =
    useForm<IFormProjectInput>();

  function createProject(data: IFormProjectInput) {
    doApiCall(projectControllerCreate, data, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(i18n.t("project.created"));
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
    <Page title={i18n.t("screen.project_add")}>
      <PageSection title={""}>
        <form className="form" onSubmit={handleSubmit(createProject)}>
          <ProjectFormElems
            formState={formState}
            register={register}
            control={control}
            buttonText={i18n.t("project.create")}
            cancelEdit={undefined}
            reset={reset}
          />
        </form>
      </PageSection>
    </Page>
  );
};
