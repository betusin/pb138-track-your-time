import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { projectsData } from "../static/projects";
import { sessionData } from "../static/sessions";
import { IProjectType } from "../types";
import { Navbar } from "./Navbar";
import { SessionItem } from "./SessionItem";

export const Project = () => {
  const { id, name, hourly_rate, isActive, customer }: IProjectType =
    projectsData[0];

  const { id: projectID } = useParams();

  const sessions = sessionData;

  const removeSession = (sessionID: string) => {
    window.alert("session will be deleted " + sessionID);
  };

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
            <SessionItem
              key={session.id}
              session={session}
              onRemove={removeSession}
            />
          ))}
        </div>
        <div className="btn-wrapper">
          <Link
            to="/session/add"
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
                <th className="project-summary__th">{hourly_rate} $/hour</th>
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
    </div>
  );
};
