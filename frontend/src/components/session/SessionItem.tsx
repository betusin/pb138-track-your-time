import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GetSessionDto } from "../../api/model";
import toast from "react-hot-toast";
import { sessionControllerRemoveWrap } from "../../util/api-call-wrappers";
import {
  dataRefreshFailedText,
  failedValidationText,
  sessionDeletedText,
  sessionNotFoundText,
} from "../../strings";
import { useSWRConfig } from "swr";
import { useApiCall } from "../../util/api-caller";
import { getProjectControllerFindAllSessionsKey } from "../../api/projects/projects";

interface SessionItemProps {
  session: GetSessionDto;
  projectId: string;
}

export const SessionItem = ({ session, projectId }: SessionItemProps) => {
  const [wantToRemove, setWantToRemove] = useState(false);
  const { mutate } = useSWRConfig();
  const doApiCall = useApiCall();

  function remove() {
    const call = sessionControllerRemoveWrap(session.id);
    doApiCall(call, undefined, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(sessionDeletedText);
    mutate(getProjectControllerFindAllSessionsKey(projectId)).catch(() =>
      toast.error(dataRefreshFailedText)
    );
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(failedValidationText);
      return true;
    } else if (code == 404) {
      toast.error(sessionNotFoundText);
      return true;
    }
    return false;
  }

  const fromDateParsed = Date.parse(session.fromDate);
  const toDateParsed = Date.parse(session.toDate);

  return (
    <div className="session-item">
      <div className="session-item__data">
        <input type="checkbox" name="invoice-session" id="" />
        {`${format(fromDateParsed, "HH:mm")} - ${format(
          toDateParsed,
          "HH:mm dd. MM. yyyy"
        )} - ${session.note}`}
      </div>
      <div className="session-item__settings">
        <Link to={`/session/${session.id}/edit`}>
          <img
            className="icon icon--small"
            src={`/assets/edit-${session.isInvoiced ? "antracit" : "lime"}.svg`}
          />
        </Link>
        {wantToRemove ? (
          <img
            className={`icon icon--small icon--inverse`}
            title="Yes, I want to delete the session"
            onClick={() => remove()}
            src={`/assets/delete-${
              session.isInvoiced ? "lime" : "antracit"
            }.svg`}
          />
        ) : (
          <img
            className="icon icon--small"
            title="Delete the session"
            onClick={() => setWantToRemove(!wantToRemove)}
            src={`/assets/delete-${
              session.isInvoiced ? "antracit" : "lime"
            }.svg`}
          />
        )}
      </div>
    </div>
  );
};
