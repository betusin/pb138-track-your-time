import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useMeControllerFindAll } from "../api/me/me";
import "../styles/Project.css";
import {
  dataRefreshFailedText,
  failedValidationText,
  noProjectFoundText,
  projectDeletedText,
} from "./Messages";
import { ProjectItem } from "./ProjectItem";
import { useApiCall, useApiSwrCall } from "../util/api-caller";
import { projectControllerRemoveWrap } from "../util/api-call-wrappers";

export const ProjectList = () => {
  const doApiCall = useApiCall();
  const { data, mutate } = useApiSwrCall((o) => {
    return useMeControllerFindAll(o);
  });
  useEffect(() => {
    if (data?.status == 404) toast.error(noProjectFoundText);
  }, [data]);
  const projects = data?.data ?? [];

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
