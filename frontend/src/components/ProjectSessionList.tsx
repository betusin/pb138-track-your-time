import { SessionItem } from "./SessionItem";
import { LoadingPlaceholder } from "./LoadingPlaceholder";
import { useLoadSessions } from "../util/load-entity-wrappers";
import { useParamOrEmpty } from "../util/params";

export interface ProjectSessionListProps {
  projectId: string;
}

export function ProjectSessionList({ projectId }: ProjectSessionListProps) {
  const id = useParamOrEmpty("id");
  const [sessions] = useLoadSessions(id);
  if (sessions === undefined) {
    return <LoadingPlaceholder />;
  }
  return (
    <div className="session-list">
      {sessions.map((session) => (
        <SessionItem key={session.id} session={session} projectId={projectId} />
      ))}
    </div>
  );
}
