import { ISessionType } from "../types";
import { format } from 'date-fns'

export const SessionItem = (session: ISessionType) => {
  return (
    <div className="session-item">
      <div className="session-item__data">
        <input type="checkbox" name="invoice-session" id="" />
        {`${format(session.fromDate, "HH:mm")} - ${format(session.toDate, "HH:mm dd. MM. yyyy")} - ${session.note}`}
      </div>
      <div className='session-item__settings'>
        <img className="icon icon--small" src={`/assets/edit-${session.isInvoiced ? 'antracit' : 'lime'}.svg`} />
        <img className="icon icon--small" src={`/assets/delete-${session.isInvoiced ? 'antracit' : 'lime'}.svg`} />
      </div>
    </div>
  );
}