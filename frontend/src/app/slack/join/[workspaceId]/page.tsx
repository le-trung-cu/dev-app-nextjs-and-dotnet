import { getCurrent } from "@/features/auth/actions"
import { JoinWorkspaceForm } from "@/slack/features/workspaces/components/join-workspace-form";
import { redirect } from "next/navigation";

export default async function JoinWorkspaceIdPage() {
  const current = await getCurrent();
  if(!current) redirect("/login");

  return <div>
    <JoinWorkspaceForm/>
  </div>
}