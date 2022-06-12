import { ProjectSessionList } from "./ProjectSessionList";
import { GetProjectDto } from "../../api/model";
import {
  useLoadProject,
  useLoadSessions,
} from "../../util/load-entity-wrappers";
import { useParamOrEmpty } from "../../util/params";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { Page } from "../common/PageContent";
import { PageSection } from "../common/PageSection";
import i18n from "i18next";
import { PlusButton } from "../common/PlusButton";
import { ProjectSummaryTable } from "./ProjectSummaryTable";
import { useState } from "react";
import { ProjectSummaryMonthChart } from "./ProjectSummaryMonthChart";
import { getHoursForSession } from "../../util/session-analysis";
import { ProjectSummaryWeekDayChart } from "./ProjectSummaryWeekDayChart";
import { ProjectSummaryDateChart } from "./ProjectSummaryDateChart";

export const Project = () => {
  const id = useParamOrEmpty("id");
  const maybeProject = useLoadProject(id);
  const [sessions] = useLoadSessions(id);
  const [selection, setSelection] = useState<string[]>([]);
  if (maybeProject === undefined || sessions === undefined) {
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
        <ProjectSessionList
          sessions={sessions}
          projectId={project.id}
          onSelectionChanged={setSelection}
        />
      </PageSection>
      <PageSection title={i18n.t("project.summary_title")}>
        <div className="project-summary-container">
          <ProjectSummaryTable project={project} sessions={sessions} />
          <ProjectSummaryMonthChart
            sessions={sessions}
            label={i18n.t("project.summary.hour_per_month")}
            monthsBack={5}
            stat={getHoursForSession}
          />
          <ProjectSummaryDateChart
            sessions={sessions}
            label={i18n.t("project.summary.hour_per_day")}
            daysBack={7}
            stat={getHoursForSession}
          />
          <ProjectSummaryWeekDayChart
            sessions={sessions}
            label={i18n.t("project.summary.hour_per_weekday")}
            stat={getHoursForSession}
          />
        </div>
      </PageSection>
    </Page>
  );
};
