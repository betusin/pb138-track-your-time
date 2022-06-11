import React from "react";
import { GetSessionDto } from "../../api/model";
import { getLastNMonths, sumStatPerMonth } from "../../util/session-analysis";
import { formatMonthLabel } from "../../util/date-formatting";
import i18n from "i18next";
import { ProjectSummaryHistoryChart } from "./ProjectSummaryHistoryChart";

export interface ProjectMonthChartProps {
  label: string;
  sessions: GetSessionDto[];
  monthsBack: number;
  stat: (session: GetSessionDto) => number;
}

export function ProjectSummaryMonthChart({
  label,
  sessions,
  monthsBack,
  stat,
}: ProjectMonthChartProps) {
  const lastMonths = getLastNMonths(monthsBack);
  const labels = lastMonths.map((month) =>
    sumStatPerMonth(sessions, month, stat)
  );
  const values = lastMonths.map((month) =>
    formatMonthLabel(month, i18n.resolvedLanguage)
  );
  return (
    <ProjectSummaryHistoryChart label={label} labels={values} values={labels} />
  );
}
