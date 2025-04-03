"use client";
import { Triangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GetWorkspaceAnalyticsResponseType } from "../types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const WorkspaceAnalytics = ({
  tasks,
}: {
  tasks: GetWorkspaceAnalyticsResponseType["workspaceAnalytics"];
}) => {
  return (
    <div className="rounded-lg border">
      <ScrollArea>
        <div className="flex">
          <div className="flex flex-1">
            <AnalytisCard title="Total Projects" count={tasks?.totalProjects} />
            <Separator orientation="vertical" className="w-[1px]" />
          </div>
          <div className="flex flex-1">
            <AnalytisCard title="Total Tasks" count={tasks?.totalTasks} />
            <Separator orientation="vertical" className="w-[1px]" />
          </div>
          <div className="flex flex-1">
            <AnalytisCard
              title="Assigned Tasks"
              count={tasks?.totalAssignedTasks}
            />
            <Separator orientation="vertical" className="w-[1px]" />
          </div>
          <div className="flex flex-1">
            <AnalytisCard
              title="Assigned Tasks"
              count={tasks?.totalAssignedTasks}
            />
            <Separator orientation="vertical" className="w-[1px]" />
          </div>
          <div className="flex flex-1">
            <AnalytisCard
              title="Completed Tasks"
              count={tasks?.totalCompletedTasks}
            />
            <Separator orientation="vertical" className="w-[1px]" />
          </div>
          <div className="flex flex-1">
            <AnalytisCard
              title="Overdue Tasks"
              count={tasks?.totalOverdueTasks}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </div>
  );
};

const AnalytisCard = ({ title, count }: { title: string; count?: number }) => {
  return (
    <div className="w-full p-2 md:p-5">
      <div className="flex items-center">
        <span className="text-muted-foreground text-nowrap">{title}</span>
        <span className="ml-5 flex items-center text-green-700">
          <Triangle
            size={12}
            fill="currentColor"
            stroke="currentColor"
            className="mr-2"
          />
          {count}
        </span>
      </div>
      <div className="mt-2 text-3xl font-bold">{count}</div>
    </div>
  );
};
