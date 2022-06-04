import { Link } from "react-router-dom";
import { projectsData } from "../static/projects";
import "../styles/Project.css";
import { IProjectType } from "../types";
import { ProjectItem } from "./ProjectItem";

export const ProjectList = () => {
  const projects: IProjectType[] = projectsData;

  return (
    <div className="project-list m1">
      {projects.map((project) => (
        <ProjectItem key={project.id} {...project} />
      ))}
      <div className="btn-wrapper">
        <Link to="/project/add" className="btn btn-add-circle">
          +
        </Link>
      </div>
    </div>
  );
};
