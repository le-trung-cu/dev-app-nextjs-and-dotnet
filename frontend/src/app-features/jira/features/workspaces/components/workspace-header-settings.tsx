"use client";
import { BreadcrumbMain } from "@/app-features/jira/components/breadcrumb-main";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useGetWorkspaceById } from "../api/use-get-workspace-by-id";

export const WorkspaceHeaderSettings = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace } = useGetWorkspaceById({ workspaceId });

  const items = [
    {
      text: workspace?.name,
      href: `/jira/workspaces/${workspaceId}`
    },
    {
      text: 'Settings'
    }
  ];
  return (
    <header>
      <BreadcrumbMain items={items} />
      <div className="px-5">
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="text-muted-foreground">Update workspace infomation</div>
      </div>
    </header>
  );
};
