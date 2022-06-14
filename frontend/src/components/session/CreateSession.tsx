import { useNavigate } from "react-router-dom";
import { SessionForm } from "./SessionForm";
import { useApiCall } from "../../util/api-caller";
import toast from "react-hot-toast";
import { sessionControllerCreateWrap } from "../../util/api-call-wrappers";
import { GetProjectDto } from "../../api/model";
import { useLoadProject } from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { useParamOrEmpty } from "../../util/params";
import i18n from "../../i18n/i18n";
import { PageSection } from "../common/PageSection";
import { Page } from "../common/PageContent";

export interface IFormSessionInput {
  fromDate: Date;
  toDate: Date;
  isInvoiced: boolean;
  hourlyRate: number;
  note: string;
}

export const CreateSession = () => {
  const navigate = useNavigate();
  const doApiCall = useApiCall();
  const id = useParamOrEmpty("id");
  const maybeProject = useLoadProject(id);
  if (maybeProject === undefined) {
    return <LoadingPlaceholder />;
  }
  const project: GetProjectDto = maybeProject;

  function createSession(data: IFormSessionInput) {
    const body = {
      fromDate: data.fromDate.toISOString(),
      toDate: data.toDate.toISOString(),
      hourlyRate: data.hourlyRate,
      note: data.note,
    };
    const call = sessionControllerCreateWrap(project.id);
    doApiCall(call, body, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(i18n.t("session.created"));
    navigate(`/project/${project.id}`);
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    }
    return false;
  }

  return (
    <Page title={i18n.t("screen.session_add")} secondaryTitle={project.name}>
      <PageSection title={""}>
        <SessionForm
          buttonText={i18n.t("screen.session_add")}
          fallbackHourlyRate={project.hourlyRate}
          onSubmit={createSession}
          cancelEdit={undefined}
        />
      </PageSection>
    </Page>
  );
};
