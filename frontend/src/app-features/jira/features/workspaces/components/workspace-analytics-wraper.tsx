"use client";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceHome } from "./workspace-home";

export const WorkspaceHomeWraper = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  return (
    <>
      <WorkspaceHeader />
      <div className="px-1 md:px-5">
        <WorkspaceHome workspaceId={workspaceId} />
      </div>
    </>
  );
};
