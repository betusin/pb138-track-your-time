import { useParams } from "react-router";
import { projectsData } from "../static/projects";
import { sessionData } from "../static/sessions";
import { IProjectType } from "../types";
import { Navbar } from "./Navbar";
import { SessionItem } from "./SessionItem";

export const Project = () => {
  const {id, name, hourly_rate, isActive, customer}: IProjectType = projectsData[0];

  const {id: projectID} = useParams();

  const sessions = sessionData;

  return (
    <div className="App">
      <Navbar />
      <div className="project-container">
        <div>
          <h2>{name}</h2>
        </div>
        <div>
          <h3>{customer}</h3>
        </div>
        <div className="session-list">
          {sessions.map((session) => (
            <SessionItem key={session.id} {...session}/>
          ))}
        </div>
      </div>
      <div className="m1">
        TODO Nejaka pekna prehladova tabulka
      </div>
    </div>
  );
}