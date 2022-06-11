import { Trans } from "react-i18next";
import { GetProjectDto } from "../../api/model";

export interface ProjectSummaryTableProps {
  project: GetProjectDto;
}

export function ProjectSummaryTable({ project }: ProjectSummaryTableProps) {
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
        <tr>
          <td className="project-summary__td">
            <Trans i18nKey="project.summary.not_yet_invoiced" />
          </td>
          <td className="project-summary__td">0</td>
          <td className="project-summary__td">0 $</td>
        </tr>
        <tr>
          <td className="project-summary__td">
            <Trans i18nKey="project.summary.already_invoiced" />
          </td>
          <td className="project-summary__td">0</td>
          <td className="project-summary__td">0 $</td>
        </tr>
        <tr>
          <td className="project-summary__td">
            <Trans i18nKey="project.summary.total" />
          </td>
          <td className="project-summary__td">0</td>
          <td className="project-summary__td">0 $</td>
        </tr>
      </tbody>
    </table>
  );
}
