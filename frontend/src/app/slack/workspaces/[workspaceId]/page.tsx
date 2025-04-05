"use client";

import { useWorkspaceId } from "@/slack/features/workspaces/hooks/use-workspace-id";

export default function WorkpsaceIdPage () {
  const workpsaceId = useWorkspaceId();
  return <div>
    {workpsaceId}
  </div>
}