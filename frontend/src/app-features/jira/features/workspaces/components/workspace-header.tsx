"use client";
import { BreadcrumbMain } from "@/app-features/jira/components/breadcrumb-main";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useGetWorkspaceById } from "../api/use-get-workspace-by-id";

export const WorkspaceHeader = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace } = useGetWorkspaceById({ workspaceId });

  const items = [
    {
      text: workspace?.name,
    },
  ];
  return (
    <header>
      <BreadcrumbMain items={items} />
      <div className="px-5">
        <h1 className="text-xl font-bold">{workspace?.name}</h1>
        <div className="text-muted-foreground">View all of your tasks here</div>
      </div>
    </header>
  );
};
