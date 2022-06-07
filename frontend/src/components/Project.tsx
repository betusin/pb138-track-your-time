import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { GetProjectDto } from '../api/model';
import { projectControllerFindOne } from '../api/projects/projects';
import { accessTokenAtom } from '../state/atom';
import { sessionData } from '../static/sessions';
import { MessageFailBlock, unauthorizedText } from './Messages';
import { Navbar } from "./Navbar";
import { SessionItem } from "./SessionItem";

export const Project = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [project, setProject] = useState<GetProjectDto>();
  const token = useRecoilValue(accessTokenAtom);
  const header = {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  };
  const { id: projectID } = useParams();

  useEffect(() => {
    async function getProject() {
      if (!projectID) {
        setErrorMessage("No project id, cannot retrieve the data!");
      }

      const result = await projectControllerFindOne(projectID, header);
      if (result.status == 200) {
        setProject(result.data);
      } else if (result.status == 401) {
        setErrorMessage(unauthorizedText);
      } else if (result.status == 404) {
        setErrorMessage("Project was not found!");
      }
    }
    getProject();
  }, [])

  const sessions = sessionData;

  const removeSession = (sessionID: string) => {
    window.alert("session will be deleted " + sessionID);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="project-container">
        { errorMessage && <MessageFailBlock text={errorMessage} /> }
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
                <th className="project-summary__th">{project?.hourlyRate} $/hour</th>
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
