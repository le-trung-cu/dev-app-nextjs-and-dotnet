import { getCurrent } from "@/app-features/auth/actions"
import { JoinWorkspaceForm } from "@/app-features/slack/features/workspaces/components/join-workspace-form";
import { redirect } from "next/navigation";

export default async function JoinWorkspaceIdPage() {
  const current = await getCurrent();
  if(!current) redirect("/login");

  return <div>
    <JoinWorkspaceForm/>
  </div>
}