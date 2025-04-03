import { getCurrent } from "@/features/auth/actions";
import { WorkspaceHomeWraper } from "@/jira/features/workspaces/components/workspace-analytics-wraper";
import { redirect } from "next/navigation";

export default async function WorkspaceIdPage() {
  const current = await getCurrent();
  if (!current) redirect("/login");

  return (
    <>
     <WorkspaceHomeWraper/>
    </>
  );
}
