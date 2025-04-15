import { getCurrent } from "@/app-features/auth/actions";
import { WorkspaceHomeWraper } from "@/app-features/jira/features/workspaces/components/workspace-analytics-wraper";
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
