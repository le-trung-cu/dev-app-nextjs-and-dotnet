import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLinkIcon,
  MoreHorizontal,
  PencilIcon,
  Trash2,
} from "lucide-react";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/app-features/jira/hooks/use-confirm";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { useDeleteTask } from "../api/use-delete-task";

interface TaskActionsProps {
  taskId: string;
  projectId?: string | null;
  children: React.ReactNode;
}
export const TaskActions = ({
  taskId,
  projectId,
  children,
}: TaskActionsProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { open } = useEditTaskModal();

  const [ConfirmDialog, confirm] = useConfirm();
  const { mutate, isPending } = useDeleteTask();

  const onDelete = async () => {
    const ok = await confirm({
      title: "Delete task",
      description: "This action cannot be undone.",
    });
    if (!ok) return;

    mutate({ workspaceId, taskId });
  };

  const onOpenTask = () => {
    router.push(`/jira/workspaces/${workspaceId}/tasks/${taskId}`);
  };

  const onOpenProject = () => {
    router.push(`/jira/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={onOpenTask}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(taskId)}
            className="p-[10px] font-medium"
          >
            <PencilIcon className="mr-2 size-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
          >
            <Trash2 className="size-4 mr-2 stroke-2" /> Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
