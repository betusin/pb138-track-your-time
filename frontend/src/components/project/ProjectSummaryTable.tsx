import { Trans } from "react-i18next";
import { GetProjectDto, GetSessionDto } from "../../api/model";
import { SummaryTableRow } from "./SummaryTableRow";
import i18n from "i18next";

export interface ProjectSummaryTableProps {
  project: GetProjectDto;
  sessions: GetSessionDto[];
}

export function ProjectSummaryTable({
  project,
  sessions,
}: ProjectSummaryTableProps) {
  return (
    <table className="project-summary">
      <thead>
        <tr>
          <th className="project-summary__th">{project?.hourlyRate} $/hour</th>
          <th className="project-summary__th">
            <Trans i18nKey="project.summary.hours" />
          </th>
          <th className="project-summary__th">
            <Trans i18nKey="project.summary.amount" />
          </th>
        </tr>
      </thead>
      <tbody>
        <SummaryTableRow
          label={i18n.t("project.summary.not_yet_invoiced")}
          items={sessions.filter((session) => !session.isInvoiced)}
          fallbackHourlyRate={project.hourlyRate}
        />
        <SummaryTableRow
          label={i18n.t("project.summary.already_invoiced")}
          items={sessions.filter((session) => session.isInvoiced)}
          fallbackHourlyRate={project.hourlyRate}
        />
        <SummaryTableRow
          label={i18n.t("project.summary.total")}
          items={sessions}
          fallbackHourlyRate={project.hourlyRate}
        />
      </tbody>
    </table>
  );
}
