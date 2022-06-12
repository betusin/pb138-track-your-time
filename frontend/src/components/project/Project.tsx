import { ProjectSessionList } from "./ProjectSessionList";
import { GetProjectDto } from "../../api/model";
import { useLoadProject } from "../../util/load-entity-wrappers";
import { useParamOrEmpty } from "../../util/params";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { Page } from "../common/PageContent";
import { PageSection } from "../common/PageSection";
import i18n from "i18next";
import { PlusButton } from "../common/PlusButton";
import { ProjectSummary } from "./ProjectSummary";

export const Project = () => {
  const id = useParamOrEmpty("id");
  const maybeProject = useLoadProject(id);
  if (maybeProject === undefined) {
    return <LoadingPlaceholder />;
  }
  const project: GetProjectDto = maybeProject;
  return (
    <Page title={project.name} secondaryTitle={project.customer}>
      <PageSection
        title={i18n.t("project.sessions")}
        controls={
          <PlusButton
            to={`/project/${project.id}/session/add`}
            title={i18n.t("session.add")}
          />
        }
      >
        <ProjectSessionList projectId={project.id} />
      </PageSection>

      <PageSection title={i18n.t("project.summary_title")}>
        <ProjectSummary project={project} />
      </PageSection>
    </Page>
  );
};
