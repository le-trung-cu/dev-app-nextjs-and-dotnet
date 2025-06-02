"use client";
import { BreadcrumbMain } from "@/app-features/jira/components/breadcrumb-main";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useGetWorkspaceById } from "../../workspaces/api/use-get-workspace-by-id";

export const WorkspaceHeaderMyTasks = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace } = useGetWorkspaceById({ workspaceId });

  const items = [
    {
      text: workspace?.name,
      href: `/jira/workspaces/${workspaceId}`
    },
    {
      text: 'My Tasks'
    }
  ];
  return (
    <header>
      <BreadcrumbMain items={items} />
      <div className="px-5">
        <h1 className="text-xl font-bold">My Tasks</h1>
        <div className="text-muted-foreground">View all of your tasks here</div>
      </div>
    </header>
  );
};
