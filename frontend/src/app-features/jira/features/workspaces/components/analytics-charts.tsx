"use client";
import {
  ChartProjectProductive,
  ChartProjectProductiveProps,
} from "./chart-project-productive";
import {
  ChartTaskPriority,
  ChartTaskPriorityProps,
} from "./chart-task-priority";
import { ChartTaskTrends, ChartTaskTrendsProps } from "./chart-task-trends";

export const AnalyticsCharts = ({
  taskTrends,
  taskPriority,
  projectProductives,
}: {
  taskTrends: ChartTaskTrendsProps["chartData"];
  taskPriority: ChartTaskPriorityProps["chartData"];
  projectProductives: ChartProjectProductiveProps["chartData"];
}) => {
  return (
    <div className="flex flex-wrap gap-10 mt-10">
      <div className="flex-1 min-w-[300px] max-w-2xl border rounded-md">
         <ChartTaskTrends chartData={taskTrends} />
      </div>
      <div className="flex-1 max-w-md border rounded-md">
        <ChartTaskPriority chartData={taskPriority} />
      </div>
      <div className="flex-1 border rounded-md">
        <ChartProjectProductive chartData={projectProductives} />
      </div>
    </div>
  );
};
