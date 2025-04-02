import { Loader } from "lucide-react";
import { useGetMembers } from "../../members/api/use-get-members";
import { useGetProjects } from "../../projects/api/use-get-projects";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { CreateTaskForm } from "./create-task-form";

export const CreateTaskFormWraper = () => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isPending: isPendingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isPending: isPendingMembers } = useGetMembers({
    workspaceId,
  });

  if (isPendingProjects || isPendingMembers) {
    return (
      <div className="flex h-[500px] items-center justify-center bg-white">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <CreateTaskForm
      projectOptions={projects ?? []}
      assigneeOptions={members ?? []}
    />
  );
};
