import { GetSessionDto } from "../api/model";
import moment from "moment";

export function getSessionsInMonth(sessions: GetSessionDto[], month: Date) {
  return sessions.filter((session) => {
    const parsed = new Date(session.fromDate);
    return (
      parsed.getFullYear() == month.getFullYear() &&
      parsed.getMonth() == month.getMonth()
    );
  });
}

export function sumStatPerMonth(
  sessions: GetSessionDto[],
  month: Date,
  statGetter: (session: GetSessionDto) => number
): number {
  return getSessionsInMonth(sessions, month)
    .map(statGetter)
    .reduce((a, b) => {
      return a + b;
    }, 0);
}

export function getHoursForSession(session: GetSessionDto): number {
  const a = moment(session.fromDate);
  const b = moment(session.toDate);
  return b.diff(a, "hours", true);
}

export function getLastNMonths(n: number): Date[] {
  return Array(n)
    .fill(0)
    .map((_, i) => {
      const monthsBack = n - i - 1;
      const date = new Date();
      date.setMonth(date.getMonth() - monthsBack);
      return date;
    });
}
