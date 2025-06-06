"use client";

import { useGetWorkspace } from "../api/use-get-workspace";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { WorkspaceAvatar } from "./workspace-avatar";

export const WorkspaceHeaderMain = () => {
  const workspaceId = useWorkspaceId();

  const { data: workspace } = useGetWorkspace({ workspaceId });

  return (
    <header className="bg-background sticky top-0 z-50 shrink-0 border-b p-4">
      <h1 className="text-muted-foreground flex items-center gap-2 px-5 pt-2 text-xl font-semibold">
        <WorkspaceAvatar name={workspace?.name ?? ""} />
        {workspace?.name}
      </h1>
    </header>
  );
};
