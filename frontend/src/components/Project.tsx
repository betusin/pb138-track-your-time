import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { GetProjectDto, GetSessionDto } from '../api/model';
import { projectControllerFindAllSessions, projectControllerFindOne } from '../api/projects/projects';
import { sessionControllerRemove, sessionControllerUpdate } from '../api/sessions/sessions';
import { accessTokenAtom } from '../state/atom';
import { failedValidationText, MessageFailBlock, MessageSuccessBlock, unauthorizedText } from './Messages';
import { SessionItem } from "./SessionItem";

export const Project = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [project, setProject] = useState<GetProjectDto>();
  const [sessions, setSessions] = useState<GetSessionDto[]>([]);
  const token = useRecoilValue(accessTokenAtom);
  const header = {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  };
  const { id: projectID } = useParams();

  useEffect(() => {
    async function getProject() {
      if (projectID == null) {
        setErrorMessage("No project id, cannot retrieve the data!");
        return;
      }

      const result = await projectControllerFindOne(projectID, header);
      if (result.status == 200) {
        setProject(result.data);
      } else if (result.status == 401) {
        setErrorMessage(unauthorizedText);
      } else if (result.status == 404) {
        setErrorMessage("Project was not found!");
      }

      const resultSessions = await projectControllerFindAllSessions(projectID, header);
      if (resultSessions.status == 200) {
        setSessions(resultSessions.data);
      } else if (resultSessions.status == 401) {
        setErrorMessage(unauthorizedText);
      } else if (resultSessions.status == 404) {
        setErrorMessage("Project was not found!");
      }
    }
    getProject();
  }, [])

  const removeSession = async (sessionID: string) => {
    const result = await sessionControllerRemove(sessionID, header);
    if (result.status == 200) {
      const newSessions = sessions.filter((session) => session.id !== sessionID);
      setSessions(() => [...newSessions]);
      setSuccessMessage("Session was deleted successfully.");
    } else if (result.status == 400) {
      setErrorMessage(failedValidationText);
    } else if (result.status == 401) {
      setErrorMessage(unauthorizedText);
    } else if (result.status == 404) {
      setErrorMessage("The session was not found!");
    }
  };

  const invoiceSession = async (session: GetSessionDto) => {
    session.isInvoiced = !session.isInvoiced;
    const result = await sessionControllerUpdate(session.id, { isInvoiced: session.isInvoiced }, header);
    if (result.status == 200) {
      setSuccessMessage("Session was updated successfully.");
    } else if (result.status == 400) {
      setErrorMessage(failedValidationText);
    } else if (result.status == 401) {
      setErrorMessage(unauthorizedText);
    } else if (result.status == 404) {
      setErrorMessage("The session was not found!");
    }
  }

  return (
    <>
      <div className="project-container">
        { successMessage && <MessageSuccessBlock text={successMessage} /> }
        { errorMessage ? <MessageFailBlock text={errorMessage} />
        :
        <><div>
            <h2>{project?.name}</h2>
          </div><div>
              <h3>{project?.customer}</h3>
            </div><div className="session-list">
              {sessions?.map((session) => (
                <SessionItem
                  key={session.id}
                  session={session}
                  projectId={projectID!}
                  onInvoice={invoiceSession}
                  onRemove={removeSession} />
              ))}
            </div><div className="btn-wrapper">
              <Link
                to={`/project/${projectID}/session/add`}
                className="btn btn-add-circle btn-add-circle--small"
                title="Add session"
              >
                +
              </Link>
            </div><div className="m1">
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
            </div></>
        }
      </div>
    </>
  );
};
