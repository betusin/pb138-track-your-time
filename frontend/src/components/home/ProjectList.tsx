import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../../styles/Project.css";
import { ProjectItem } from "./ProjectItem";
import { useApiCall } from "../../util/api-caller";
import { projectControllerRemoveWrap } from "../../util/api-call-wrappers";
import { useLoadProjects } from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import i18n from "../../i18n/i18n";

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
    toast.success(i18n.t("project.deleted"));
    mutate().catch(() => toast.error(i18n.t("error.refresh_failed")));
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    } else if (code == 404) {
      toast.error(i18n.t("project.not_found"));
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
