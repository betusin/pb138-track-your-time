/* eslint-disable @typescript-eslint/ban-types */
import { Checkbox, FormControlLabel } from '@mui/material';
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GetSessionDto } from '../api/model';

interface ISessionItemProps {
  session: GetSessionDto;
  onRemove: Function;
  onInvoice: Function;
  projectId: string;
}

export const SessionItem = ({ session, onRemove, projectId, onInvoice }: ISessionItemProps) => {
  const [wantToRemove, setWantToRemove] = useState(false);
  const fromDateParsed = Date.parse(session.fromDate.slice(0, -1));
  const toDateParsed = Date.parse(session.toDate.slice(0, -1));

  return (
    <div className="session-item">
      <div className="session-item__data">
        <Checkbox
          defaultChecked={session.isInvoiced}
          onChange={() => onInvoice(session)}
        />
        {`${format(fromDateParsed, "HH:mm")} - ${format(
          toDateParsed,
          "HH:mm dd. MM. yyyy"
        )} - ${session.note}`}
      </div>
      <div className="session-item__settings">
        <Link to={`/project/${projectId}/session/edit/${session.id}`}>
          <img
            className="icon icon--small"
            src={`/assets/edit-${session.isInvoiced ? "antracit" : "lime"}.svg`}
          />
        </Link>
        {wantToRemove ? (
          <img
            className={`icon icon--small icon--inverse`}
            title="Yes, I want to delete the session"
            onClick={() => onRemove(session.id)}
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
