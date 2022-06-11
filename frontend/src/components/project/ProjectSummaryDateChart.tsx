import React from "react";
import { GetSessionDto } from "../../api/model";
import { getLastNDays, sumStatPerDate } from "../../util/session-analysis";
import { formatDateLabel } from "../../util/date-formatting";
import i18n from "i18next";
import { ProjectSummaryHistoryChart } from "./ProjectSummaryHistoryChart";

export interface ProjectSummaryDateChartProps {
  label: string;
  sessions: GetSessionDto[];
  daysBack: number;
  stat: (session: GetSessionDto) => number;
}

export function ProjectSummaryDateChart({
  label,
  sessions,
  daysBack,
  stat,
}: ProjectSummaryDateChartProps) {
  const lastMonths = getLastNDays(daysBack);
  const values = lastMonths.map((month) =>
    sumStatPerDate(sessions, month, stat)
  );
  const labels = lastMonths.map((month) =>
    formatDateLabel(month, i18n.resolvedLanguage)
  );
  return (
    <ProjectSummaryHistoryChart label={label} labels={labels} values={values} />
  );
}
