"use client";
import { Triangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GetWorkspaceAnalyticsResponseType } from "../features/workspaces/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseGetWorkspaceAnalytics } from "../features/workspaces/api/use-get-workspace-analytics";
import { AnalyticsCard } from "./analytics-card";
import { AnalyticsCharts } from "../features/workspaces/components/analytics-charts";

export const WorkspaceAnalytics = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const { data, isPending: isGettingWorkspaceStatiscal } =
    useSuspenseGetWorkspaceAnalytics({ workspaceId });

  return (
    <div>
      <div className="rounded-lg border">
        <ScrollArea>
          <div className="flex">
            <div className="flex flex-1">
              <AnalyticsCard
                title="Total Projects"
                value={data.totalProjects}
                variant={data.projectDifference > 0 ? "up" : "down"}
                increaseValue={data.projectDifference}
              />
              <Separator orientation="vertical" className="w-[1px]" />
            </div>
            <div className="flex flex-1">
              <AnalyticsCard
                title="Total Tasks"
                value={data.totalTasks}
                variant={data.taskDifference > 0 ? "up" : "down"}
                increaseValue={data.taskDifference}
              />
              <Separator orientation="vertical" className="w-[1px]" />
            </div>
            <div className="flex flex-1">
              <AnalyticsCard
                title="Assigned Tasks"
                value={data.totalAssignedTasks}
                variant={data.assignedTaskDifference > 0 ? "up" : "down"}
                increaseValue={data.assignedTaskDifference}
              />
              <Separator orientation="vertical" className="w-[1px]" />
            </div>
            <div className="flex flex-1">
              <AnalyticsCard
                title="Completed Tasks"
                value={data.totalCompletedTasks}
                variant={data.completedTaskDifference > 0 ? "up" : "down"}
                increaseValue={data.completedTaskDifference}
              />
              <Separator orientation="vertical" className="w-[1px]" />
            </div>
            <div className="flex flex-1">
              <AnalyticsCard
                title="Overdue Tasks"
                value={data.totalOverdueTasks}
                variant={data.overdueTaskDifference > 0 ? "up" : "down"}
                increaseValue={data.overdueTaskDifference}
              />
            </div>
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </div>
      <AnalyticsCharts
        taskTrends={data?.taskTrends ?? []}
        taskPriority={data?.taskPriorities ?? []}
        projectProductives={data?.projectProductives ?? []}
      />
    </div>
  );
};

export const WorkspaceAnalyticsSkeleton = () => {
  return <Skeleton className="h-[108px]" />;
};
