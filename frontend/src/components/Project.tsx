import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useProjectControllerFindOne } from "../api/projects/projects";
import { sessionData } from "../static/sessions";
import { noProjectFoundText } from "./Messages";
import { SessionItem } from "./SessionItem";
import { useApiSwrCall } from "../util/api-caller";

export const Project = () => {
  const { id: projectIDParam } = useParams();
  const projectID = projectIDParam ?? "";
  const { data } = useApiSwrCall((o) => {
    return useProjectControllerFindOne(projectID, o);
  });
  useEffect(() => {
    if (data?.status == 404) toast.error(noProjectFoundText);
  }, [data]);

  const sessions = sessionData;

  const removeSession = (sessionID: string) => {
    window.alert("session will be deleted " + sessionID);
  };

  if (!data?.data) {
    return <></>;
  }
  const project = data?.data;
  return (
    <>
      <div className="project-container">
        <div>
          <h2>{project?.name}</h2>
        </div>
        <div>
          <h3>{project?.customer}</h3>
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
                <th className="project-summary__th">
                  {project?.hourlyRate} $/hour
                </th>
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
    </>
  );
};
