import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { meControllerFindAll } from "../api/me/me";
import { GetProjectDto } from "../api/model";
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

function onProjectsReceived(
  result: AxiosResponse<GetProjectDto[]>,
  setProjects: Dispatch<SetStateAction<GetProjectDto[]>>
) {
  if (result.status == 200) {
    setProjects(result.data);
  } else if (result.status == 401) {
    toast.error(unauthorizedText);
  } else {
    toast.error(unexpectedErrorText);
  }
}

export const ProjectList = () => {
  const token = useRecoilValue(accessTokenAtom);
  const [projects, setProjects] = useState<GetProjectDto[]>([]);
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    meControllerFindAll(header)
      .then((result) => onProjectsReceived(result, setProjects))
      .catch(() => toast.error(unexpectedErrorText));
  }, []);

  const deleteProject = async (projectID: string) => {
    const result = await projectControllerRemove(projectID, header);
    if (result.status == 200) {
      const newProjects = projects.filter(
        (project) => project.id !== projectID
      );
      setProjects(() => [...newProjects]);
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
      <Toaster />
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
