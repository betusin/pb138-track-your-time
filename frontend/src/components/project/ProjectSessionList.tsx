import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { useLoadSessions } from "../../util/load-entity-wrappers";
import { useParamOrEmpty } from "../../util/params";
import toast from "react-hot-toast";
import i18n from "i18next";
import { sessionControllerRemoveWrap } from "../../util/api-call-wrappers";
import { useApiCall } from "../../util/api-caller";
import { useSWRConfig } from "swr";
import { getProjectControllerFindAllSessionsKey } from "../../api/projects/projects";
import { ProjectSessionListView } from "./ProjectSessionListView";

export interface ProjectSessionListProps {
  projectId: string;
  onSelectionChanged: (ids: string[]) => void;
}

export function ProjectSessionList({
  projectId,
  onSelectionChanged,
}: ProjectSessionListProps) {
  const { mutate } = useSWRConfig();
  const doApiCall = useApiCall();
  const id = useParamOrEmpty("id");
  const [sessions] = useLoadSessions(id);
  if (sessions === undefined) {
    return <LoadingPlaceholder />;
  }

  function remove(sessionId: string) {
    const call = sessionControllerRemoveWrap(sessionId);
    doApiCall(call, undefined, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(i18n.t("session.deleted"));
    mutate(getProjectControllerFindAllSessionsKey(projectId)).catch(() =>
      toast.error(i18n.t("error.refresh_failed"))
    );
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    } else if (code == 404) {
      toast.error(i18n.t("session.not_found"));
      return true;
    }
    return false;
  }

  return (
    <ProjectSessionListView
      sessions={sessions}
      remove={remove}
      onSelectionChanged={onSelectionChanged}
    />
  );
}
