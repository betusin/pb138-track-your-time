import i18n from "../../i18n/i18n";
import { Page } from "../common/PageContent";
import { useParamOrEmpty } from "../../util/params";
import {
  useLoadProject,
  useLoadSession,
} from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { useDateTimeFormatter } from "../../util/date-formatting";
import { PageSection } from "../common/PageSection";
import { SessionPhotoSection } from "./SessionPhotoSection";
import { UploadImageButton } from "./UploadImageButton";
import { useSWRConfig } from "swr";
import { getSessionControllerFindOneKey } from "../../api/sessions/sessions";
import toast from "react-hot-toast";
import { GetSessionWithPhotosDto } from "../../api/model";

export function Session() {
  const dateTimeFormatter = useDateTimeFormatter();
  const id = useParamOrEmpty("id");
  const maybeSession = useLoadSession(id);
  const project = useLoadProject(maybeSession?.projectId ?? "");
  const { mutate } = useSWRConfig();
  if (maybeSession === undefined || project == undefined) {
    return <LoadingPlaceholder />;
  }
  const session: GetSessionWithPhotosDto = maybeSession;
  const dateTimeStr = dateTimeFormatter(new Date(session.fromDate));

  function onPhotoUploaded() {
    mutate(getSessionControllerFindOneKey(id)).catch(() =>
      toast.error(i18n.t("error.refresh_failed"))
    );
  }

  return (
    <Page
      title={`${i18n.t("screen.session")} ${dateTimeStr}`}
      secondaryTitle={project.name}
    >
      <PageSection
        title={i18n.t("session.photos")}
        controls={
          <UploadImageButton
            url={`http://localhost:3000/api/v1/sessions/${id}/photos`}
            onSuccess={onPhotoUploaded}
          />
        }
      >
        <SessionPhotoSection session={session} />
      </PageSection>
    </Page>
  );
}
