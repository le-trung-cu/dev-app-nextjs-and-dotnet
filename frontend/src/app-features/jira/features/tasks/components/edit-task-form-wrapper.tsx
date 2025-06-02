import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { EditTaskForm } from "./edit-task-form";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useGetTaskById } from "../api/use-get-task-by-id";
import { useGetProjects } from "../../projects/api/use-get-projects";
import { useGetMembers } from "../../members/api/use-get-members";

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  taskId: string;
};

export const EditTaskFormWrapper = ({
  onCancel,
  taskId,
}: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading: isLoadingTask } = useGetTaskById({
    workspaceId,
    taskId,
  });

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

  const projectOptions = projects?.map((project) => ({
    id: project.id,
    name: project.name,
    imageUrl: project.imgUrl,
  }));

  const memberOptions = members?.map((project) => ({
    id: project.id,
    userId: project.userId,
    name: project.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (!initialValues) {
    return null;
  }

  const task = {...initialValues.task, assigneeId: initialValues.assignee.userId}

  return (
    <EditTaskForm
      onCancel={onCancel}
      initialValues={task}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};
