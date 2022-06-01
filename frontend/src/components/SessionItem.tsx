import { ISessionType } from "../types";
import { format } from 'date-fns'
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ISessionItemProps {
  session: ISessionType,
  onRemove: Function,
}

export const SessionItem = ({session, onRemove}: ISessionItemProps) => {
  const [ wantToRemove, setWantToRemove ] = useState(false);

  return (
    <div className="session-item">
      <div className="session-item__data">
        <input type="checkbox" name="invoice-session" id="" />
        {`${format(session.fromDate, "HH:mm")} - ${format(session.toDate, "HH:mm dd. MM. yyyy")} - ${session.note}`}
      </div>
      <div className='session-item__settings'>
        <Link to={`/session/edit/${session.id}`}>
          <img className="icon icon--small" src={`/assets/edit-${session.isInvoiced ? 'antracit' : 'lime'}.svg`} />
        </Link>
        {wantToRemove ? (
          <img className={`icon icon--small icon--inverse`} title='Yes, I want to delete the session' onClick={() => onRemove(session.id)} src={`/assets/delete-${session.isInvoiced ? 'lime' : 'antracit'}.svg`} />
        ) : (
          <img className="icon icon--small" title='Delete the session' onClick={() => setWantToRemove(!wantToRemove)} src={`/assets/delete-${session.isInvoiced ? 'antracit' : 'lime'}.svg`} />
        )}
      </div>
    </div>
  );
}