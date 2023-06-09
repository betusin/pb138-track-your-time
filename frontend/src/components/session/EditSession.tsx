import { useNavigate } from "react-router-dom";
import { IFormSessionInput } from "./CreateSession";
import { SessionForm } from "./SessionForm";
import {
  useLoadProject,
  useLoadSession,
} from "../../util/load-entity-wrappers";
import { GetSessionDto } from "../../api/model";
import { sessionControllerUpdateWrap } from "../../util/api-call-wrappers";
import toast from "react-hot-toast";
import { useApiCall } from "../../util/api-caller";
import { useSWRConfig } from "swr";
import { getSessionControllerFindOneKey } from "../../api/sessions/sessions";
import { useParamOrEmpty } from "../../util/params";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import i18n from "../../i18n/i18n";
import { Page } from "../common/PageContent";
import { PageSection } from "../common/PageSection";
import { refreshFailedErrorToast } from "../../util/common-toasts";

export const EditSession = () => {
  const navigate = useNavigate();
  const apiCall = useApiCall();
  const { mutate } = useSWRConfig();

  const id = useParamOrEmpty("id");
  const maybeSession = useLoadSession(id);
  const project = useLoadProject(maybeSession?.projectId ?? "");
  if (maybeSession === undefined || project == undefined) {
    return <LoadingPlaceholder />;
  }
  const session: GetSessionDto = maybeSession;

  function updateSession(data: IFormSessionInput) {
    const body = {
      fromDate: data.fromDate.toISOString(),
      toDate: data.toDate.toISOString(),
      hourlyRate: data.hourlyRate,
      note: data.note,
      isInvoiced: data.isInvoiced,
    };
    const call = sessionControllerUpdateWrap(id);
    apiCall(call, body, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(i18n.t("session.updated"));
    mutate(getSessionControllerFindOneKey(id)).catch(refreshFailedErrorToast);
    navigate(`/project/${session.projectId}`);
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    }
    return false;
  }

  function cancelEdit() {
    toast(i18n.t("confirm.cancelled_edit"));
    navigate(`/project/${session.projectId}`);
  }

  return (
    <Page title={i18n.t("screen.session_edit")} secondaryTitle={project.name}>
      <PageSection title={""}>
        <SessionForm
          buttonText={i18n.t("session.edit")}
          prefill={session}
          fallbackHourlyRate={project.hourlyRate}
          onSubmit={updateSession}
          cancelEdit={cancelEdit}
        />
      </PageSection>
    </Page>
  );
};
