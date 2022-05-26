import '../styles/Project.css'
import { ProjectItem } from "./ProjectItem";

export const ProjectList = () => {
  const projects = [{
      name: "This is maybe a too long project name",
      hourly_rate: 120,
      isActive: true,
      customer: "Customer name",
    }, {
      name: "This is a second project",
      hourly_rate: 150,
      isActive: true,
      customer: "Customer name",
    }, {
      name: "The real Project",
      hourly_rate: 60,
      isActive: true,
      customer: "Customer name",
    }, {
      name: "Not active anymore",
      hourly_rate: 666,
      isActive: false,
      customer: "Customer name",
    },
  ];

  return (
    <div className="project-list m1">
      {projects.map((project, index) => (
        <ProjectItem key={index} {...project} />
      ))}
      <div className="btn-wrapper">
        <button className="btn-add-project">+</button>
      </div>
    </div>
  );
}