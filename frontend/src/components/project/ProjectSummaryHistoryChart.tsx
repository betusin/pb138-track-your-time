import { theme } from "../../styles/theme";
import { Line } from "react-chartjs-2";
import React from "react";
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
import { fontConfig } from "../../styles/chart-config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface ProjectSummaryHistoryChartProps {
  label: string;
  labels: string[];
  values: number[];
}

export function ProjectSummaryHistoryChart({
  label,
  labels,
  values,
}: ProjectSummaryHistoryChartProps) {
  const color = theme.palette.secondary.light;
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
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
