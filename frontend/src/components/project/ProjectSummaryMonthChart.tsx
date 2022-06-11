import React from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { GetSessionDto } from "../../api/model";
import { getLastNMonths, sumStatPerMonth } from "../../util/session-analysis";
import { theme } from "../../styles/theme";
import { formatMonthLabel } from "../../util/date-formatting";
import i18n from "i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fontConfig = {
  ticks: {
    font: {
      size: 18,
    },
  },
};

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
  const sumsPerMonth = lastMonths.map((month) =>
    sumStatPerMonth(sessions, month, stat)
  );
  const monthLabels = lastMonths.map((month) =>
    formatMonthLabel(month, i18n.resolvedLanguage)
  );
  const color = theme.palette.secondary.light;
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: label,
        data: sumsPerMonth,
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };
  return (
    <div className="project-summary-chart">
      <Line
        options={{
          responsive: true,
          scales: {
            x: fontConfig,
            y: fontConfig,
          },
          elements: {
            line: {
              cubicInterpolationMode: "monotone",
            },
          },
        }}
        data={data}
      />
    </div>
  );
}
