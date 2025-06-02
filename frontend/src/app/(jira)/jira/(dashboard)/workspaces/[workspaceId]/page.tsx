import { getCurrent } from "@/app-features/auth/actions";
import { WorkspaceHome } from "@/app-features/jira/features/workspaces/components/workspace-home";

import { redirect } from "next/navigation";

export default async function WorkspaceIdPage({
  params,
}: {
  params: Promise<{
    workspaceId: string;
  }>;
}) {
  const { workspaceId } = await params;
  const current = await getCurrent();
  if (!current) redirect("/login");

  return <WorkspaceHome workspaceId={workspaceId} />;
}
