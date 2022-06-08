import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { meControllerFindAll } from "../api/me/me";
import { GetProjectDto } from "../api/model";
import { projectControllerRemove } from "../api/projects/projects";
import { accessTokenAtom } from "../state/atom";
import "../styles/Project.css";
import {
  MessageFailBlock,
  MessageSuccessBlock,
  MessageUnauthorized,
} from "./Messages";
import { ProjectItem } from "./ProjectItem";

export const ProjectList = () => {
  const token = useRecoilValue(accessTokenAtom);
  const [projects, setProjects] = useState<GetProjectDto[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    async function getProjects() {
      const result = await meControllerFindAll(header);
      if (result.status == 200) {
        setProjects(result.data);
      } else if (result.status == 401) {
        return <MessageUnauthorized />;
      }
    }
    getProjects();
  }, []);

  const deleteProject = async (projectID: string) => {
    const result = await projectControllerRemove(projectID, header);
    if (result.status == 200) {
      const newProjects = projects.filter(
        (project) => project.id !== projectID
      );
      setProjects(() => [...newProjects]);
      setSuccessMessage("Project deleted successfully.");
    } else if (result.status == 400) {
      setErrorMessage("Field validation failed!");
    } else if (result.status == 401) {
      setErrorMessage("Unauthorized operation!");
    } else if (result.status == 404) {
      setErrorMessage("The project was not found!");
    }
  };

  return (
    <>
      {successMessage && <MessageSuccessBlock text={successMessage} />}
      {errorMessage && <MessageFailBlock text={errorMessage} />}
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
