import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useMeControllerFindAll } from "../api/me/me";
import { projectControllerRemove } from "../api/projects/projects";
import { accessTokenAtom } from "../state/atom";
import "../styles/Project.css";
import {
  failedValidationText,
  noProjectFoundText,
  unauthorizedText,
  unexpectedErrorText,
} from "./Messages";
import { ProjectItem } from "./ProjectItem";
import { useApiSwrCall } from "../util/api-caller";

export const ProjectList = () => {
  const token = useRecoilValue(accessTokenAtom);
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const { data, mutate } = useApiSwrCall((o) => {
    return useMeControllerFindAll(o);
  });
  useEffect(() => {
    if (data?.status == 404) toast.error(noProjectFoundText);
  }, [data]);
  const projects = data?.data ?? [];

  const deleteProject = async (projectID: string) => {
    const result = await projectControllerRemove(projectID, header);
    if (result.status == 200) {
      await mutate();
      toast.success("Project deleted successfully.");
    } else if (result.status == 400) {
      toast.error(failedValidationText);
    } else if (result.status == 401) {
      toast.error(unauthorizedText);
    } else if (result.status == 404) {
      toast.error(noProjectFoundText);
    } else {
      toast.error(unexpectedErrorText);
    }
  };

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
