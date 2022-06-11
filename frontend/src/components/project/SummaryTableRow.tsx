import { GetSessionDto } from "../../api/model";
import { getHoursForSession } from "../../util/session-analysis";
import { plus } from "../../util/math";

export interface SummaryTableRowProps {
  label: string;
  items: GetSessionDto[];
  fallbackHourlyRate: number;
}

export function SummaryTableRow({
  label,
  items,
  fallbackHourlyRate,
}: SummaryTableRowProps) {
  const hours = items.map(getHoursForSession).reduce(plus, 0);
  const cash = items.reduce((a, b) => {
    return a + getHoursForSession(b) * (b.hourlyRate ?? fallbackHourlyRate);
  }, 0);
  return (
    <tr>
      <td className="project-summary__td">{label}</td>
      <td className="project-summary__td">{Math.floor(hours)}</td>
      <td className="project-summary__td">{Math.floor(cash)}$</td>
    </tr>
  );
}
