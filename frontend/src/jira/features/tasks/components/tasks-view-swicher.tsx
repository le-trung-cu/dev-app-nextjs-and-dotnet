"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useCreateTaskDialog } from "../hooks/use-create-task-dialog";
import { DataFilter } from "./data-filter";
import { useGetProjects } from "../../projects/api/use-get-projects";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useGetTasks } from "../api/use-get-tasks";
import { useGetMembers } from "../../members/api/use-get-members";

export const TasksViewSwicher = () => {
  const { open } = useCreateTaskDialog();
  const workspaceId = useWorkspaceId();
  const { data: projects, isPending: isPendingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isPending: isPendingMembers } = useGetMembers({
    workspaceId,
  });
  const { data: tasksData, isPending: isPendingTasks } = useGetTasks({
    workspaceId,
  });
  
  return (
    <Tabs>
      <div className="flex flex-wrap items-center gap-2">
        <TabsList className="w-full md:w-fit">
          <TabsTrigger value="table">table</TabsTrigger>
          <TabsTrigger value="kanban">kanban</TabsTrigger>
          <TabsTrigger value="calendar">calendar</TabsTrigger>
        </TabsList>
        <Button className="h-8 w-full p-0 md:w-fit" onClick={open}>
          New <Plus />
        </Button>
      </div>
      <div>
        <DataFilter
          projectOptions={projects ?? []}
          assigneeIdOptions={members ?? []}
        />
      </div>
      <TabsContent value="table"></TabsContent>
      <TabsContent value="kanban"></TabsContent>
      <TabsContent value="calendar"></TabsContent>
    </Tabs>
  );
};
