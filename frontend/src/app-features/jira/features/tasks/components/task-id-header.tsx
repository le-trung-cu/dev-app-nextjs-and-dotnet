"use client";
import { BreadcrumbMain } from "@/app-features/jira/components/breadcrumb-main";
import { Workspace } from "../../workspaces/types";
import { Task } from "../types";
import { WorkspaceAvatar } from "../../workspaces/components/workspace-avatar";
import { Project } from "../../projects/types";
import { ProjectAvatar } from "../../projects/components/project-avatar";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/app-features/jira/hooks/use-confirm";
import { useRouter } from "next/navigation";

type Props = {
  workspace: Workspace;
  task: Task;
  project: Project;
};

export const TaskIdHeader = ({ workspace, task, project }: Props) => {
  const items = [
    {
      href: `/jira/workspaces/${workspace.id}`,
      icon: (
        <WorkspaceAvatar
          className="size-6"
          name={workspace.name}
          imgUrl={workspace.imgUrl}
        />
      ),
      text: workspace.name,
    },
    {
      href: `/jira/workspaces/${workspace.id}/projects/${task.projectId}`,
      icon: (
        <ProjectAvatar
          className="size-6"
          name={workspace.name}
          imgUrl={workspace.imgUrl}
        />
      ),
      text: project.name,
    },
    {
      text: task.name,
    },
  ];
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm();
  const { mutate, isPending } = useDeleteTask();
  async function onDeleteHandler() {
    const ok = await confirm({
      title: "Delete task?",
      description: "This action cannot be undone",
    });
    if (!ok) return;
    mutate(
      { workspaceId: task.workspaceId, taskId: task.id },
      {
        onSuccess: () => {
          router.replace(`/jira/workspaces/${task.workspaceId}/tasks`);
        },
      },
    );
  }

  return (
    <>
      <ConfirmDialog />
      <header className="flex items-center justify-between">
        <div>
          <BreadcrumbMain items={items} />
          <div className="px-5">
            <h1 className="text-xl font-bold">{task.name}</h1>
          </div>
        </div>
        <Button
          disabled={isPending}
          onClick={onDeleteHandler}
          variant="destructive"
        >
          <Trash /> Delete Task
        </Button>
      </header>
    </>
  );
};
