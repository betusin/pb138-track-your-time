import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../../styles/Project.css";
import {
  dataRefreshFailedText,
  failedValidationText,
  noProjectFoundText,
  projectDeletedText,
} from "../../strings";
import { ProjectItem } from "./ProjectItem";
import { useApiCall } from "../../util/api-caller";
import { projectControllerRemoveWrap } from "../../util/api-call-wrappers";
import { useLoadProjects } from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";

export const ProjectList = () => {
  const doApiCall = useApiCall();
  const [projects, mutate] = useLoadProjects();

  if (projects === undefined) {
    return <LoadingPlaceholder />;
  }

  function deleteProject(projectID: string) {
    const call = projectControllerRemoveWrap(projectID);
    doApiCall(call, undefined, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(projectDeletedText);
    mutate().catch(() => toast.error(dataRefreshFailedText));
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(failedValidationText);
      return true;
    } else if (code == 404) {
      toast.error(noProjectFoundText);
      return true;
    }
    return false;
  }

  return (
    <>
      <div className="project-list m1">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onDelete={deleteProject}
          />
        ))}
        <div className="btn-wrapper">
          <Link to="/project/add" className="btn btn-add-circle">
            +
          </Link>
        </div>
      </div>
    </>
  );
};
