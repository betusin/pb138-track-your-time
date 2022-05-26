import { ISessionType } from "../types";
import { format } from 'date-fns'

export const SessionItem = (session: ISessionType) => {
  return (
    <div className="session-item">
      <input type="checkbox" name="invoice-session" id="" />
      {`${format(session.fromDate, "HH:mm")} - ${format(session.toDate, "HH:mm dd. MM. yyyy")} - ${session.note}`}
      <img className="icon" src={`/assets/edit-${session.isInvoiced ? 'antracit' : 'lime'}.svg`} />
      <img className="icon" src={`/assets/delete-${session.isInvoiced ? 'antracit' : 'lime'}.svg`} />
    </div>
  );
}