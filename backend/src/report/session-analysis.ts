import { GetSessionDto } from '../session/dto/get-session.dto';
import * as moment from 'moment';
import { Session } from '@prisma/client';
import { plus } from '../math';

export function getHoursForSession(session: GetSessionDto): number {
  const a = moment(session.fromDate);
  const b = moment(session.toDate);
  return b.diff(a, 'hours', true);
}

export function getUninvoicedSessionsBetween(
  sessions: Session[],
  start: Date,
  end: Date,
) {
  return sessions.filter((session) => {
    return (
      session.fromDate >= start &&
      session.fromDate <= end &&
      !session.isInvoiced
    );
  });
}

export function calculateHoursForSessions(items: GetSessionDto[]): number {
  return items.map(getHoursForSession).reduce(plus, 0);
}

export function calculateCashForSessions(items: GetSessionDto[], project) {
  return items.reduce((a, b) => {
    return a + getHoursForSession(b) * (b.hourlyRate ?? project.hourlyRate);
  }, 0);
}
