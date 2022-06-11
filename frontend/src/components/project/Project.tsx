import { Link } from "react-router-dom";
import { ProjectSessionList } from "./ProjectSessionList";
import { GetProjectDto } from "../../api/model";
import { useLoadProject } from "../../util/load-entity-wrappers";
import { useParamOrEmpty } from "../../util/params";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { Trans } from "react-i18next";
import { ScreenTitle } from "../common/ScreenTitle";

export const Project = () => {
  const id = useParamOrEmpty("id");
  const maybeProject = useLoadProject(id);
  if (maybeProject === undefined) {
    return <LoadingPlaceholder />;
  }
  const project: GetProjectDto = maybeProject;
  return (
    <>
      <ScreenTitle title={project.name} secondaryTitle={project.customer} />
      <div className="project-container">
        <ProjectSessionList projectId={project.id} />
        <div className="btn-wrapper">
          <Link
            to={`/project/${project.id}/session/add`}
            className="btn btn-add-circle btn-add-circle--small"
            title="Add session"
          >
            +
          </Link>
        </div>
        <div className="m1">
          <table className="project-summary">
            <thead>
              <tr>
                <th className="project-summary__th">
                  {project?.hourlyRate} $/hour
                </th>
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
        </div>
      </div>
    </>
  );
};
