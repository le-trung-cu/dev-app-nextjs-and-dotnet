"use client";
import { useGetTaskById } from "@/app-features/jira/features/tasks/api/use-get-task-by-id";
import { TaskDescription } from "@/app-features/jira/features/tasks/components/task-description";
import { TaskIdHeader } from "@/app-features/jira/features/tasks/components/task-id-header";
import { TaskOverview } from "@/app-features/jira/features/tasks/components/task-overview";
import { Loader } from "lucide-react";

type Props = {
  workspaceId: string;
  taskId: string;
};
export const TaskIdClient = ({ workspaceId, taskId }: Props) => {
  const { data, isLoading } = useGetTaskById({ workspaceId, taskId });

  if(isLoading) {
    return <div className="h-[200px] flex items-center justify-center">
      <Loader className="animate-spin duration-700"/>
    </div>
  }
  if(!data) {
    throw new Error("Task not found");
  }

  return (
    <div>
      <TaskIdHeader task={data.task} workspace={data.workspace} project={data.project}/>
      <div className="grid gap-5 lg:grid-cols-2 items-start mt-5" >
        <TaskOverview task={data.task} assignee={data.assignee}/>
        <TaskDescription task={data.task}/>
      </div>
    </div>
  );
};
