import { SessionItem } from "./SessionItem";
import { useParams } from "react-router";
import { useApiSwrCall } from "../util/api-caller";
import { useProjectControllerFindAllSessions } from "../api/projects/projects";

export interface ProjectSessionListProps {
  projectId: string;
}

export function ProjectSessionList({ projectId }: ProjectSessionListProps) {
  const { id: sessionIdParam } = useParams();
  const sessionId = sessionIdParam ?? "";
  const { data } = useApiSwrCall((o) => {
    return useProjectControllerFindAllSessions(sessionId, o);
  });

  if (!data?.data) {
    return <></>;
  }
  const sessions = data?.data;
  return (
    <div className="session-list">
      {sessions.map((session) => (
        <SessionItem key={session.id} session={session} projectId={projectId} />
      ))}
    </div>
  );
}
