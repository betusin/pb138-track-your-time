import { Link } from "react-router-dom";
import { ProjectSessionList } from "./ProjectSessionList";
import { GetProjectDto } from "../../api/model";
import { useLoadProject } from "../../util/load-entity-wrappers";
import { useParamOrEmpty } from "../../util/params";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";

export const Project = () => {
  const id = useParamOrEmpty("id");
  const maybeProject = useLoadProject(id);
  if (maybeProject === undefined) {
    return <LoadingPlaceholder />;
  }
  const project: GetProjectDto = maybeProject;
  return (
    <>
      <div className="project-container">
        <div>
          <h2>{project?.name}</h2>
        </div>
        <div>
          <h3>{project?.customer}</h3>
        </div>
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
                <th className="project-summary__th">Hours</th>
                <th className="project-summary__th">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="project-summary__td">Not invoiced yet</td>
                <td className="project-summary__td">0</td>
                <td className="project-summary__td">0 $</td>
              </tr>
              <tr>
                <td className="project-summary__td">Invoiced</td>
                <td className="project-summary__td">0</td>
                <td className="project-summary__td">0 $</td>
              </tr>
              <tr>
                <td className="project-summary__td">Total</td>
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
