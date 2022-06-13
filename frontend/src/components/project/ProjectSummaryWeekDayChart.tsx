import { getDaysInWeek } from "../../util/session-analysis";
import { formatDayLabel } from "../../util/date-formatting";
import { Bar } from "react-chartjs-2";
import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import i18n from "i18next";
import { GetSessionDto } from "../../api/model";
import { theme } from "../../styles/theme";
import { fontConfig } from "../../styles/chart-config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: fontConfig,
    y: fontConfig,
  },
};

export interface ProjectSummaryWeekDayChartProps {
  label: string;
  sessions: GetSessionDto[];
  stat: (session: GetSessionDto) => number;
}

export function ProjectSummaryWeekDayChart({
  label,
  sessions,
  stat,
}: ProjectSummaryWeekDayChartProps) {
  const days = getDaysInWeek();
  const hoursPerDay = days.map((day) => {
    return sessions
      .filter((session) => new Date(session.fromDate).getDay() == day.getDay())
      .map(stat)
      .reduce((a, b) => {
        return a + b;
      }, 0);
  });
  const labels = days.map((day) => formatDayLabel(day, i18n.resolvedLanguage));
  const color = theme.palette.secondary.light;
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: hoursPerDay,
        backgroundColor: color,
      },
    ],
  };
  return (
    <div className="project-summary-chart">
      <Bar options={options} data={data} />
    </div>
  );
}
