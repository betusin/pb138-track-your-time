import { SessionItem } from "./SessionItem";
import { useApiSwrCall } from "../util/api-caller";
import { useProjectControllerFindAllSessions } from "../api/projects/projects";
import { useParamOrEmpty } from "../util/params";

export interface ProjectSessionListProps {
  projectId: string;
}

export function ProjectSessionList({ projectId }: ProjectSessionListProps) {
  const sessionId = useParamOrEmpty("id");
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
