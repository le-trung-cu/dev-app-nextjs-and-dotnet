import { getCurrent } from "@/app-features/auth/actions"
import { JoinWorkspaceForm } from "@/app-features/jira/features/members/components/join-workspace-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const current = await getCurrent();
  if(!current) redirect("/login");

  return <div className="max-w-[500px] mx-auto mt-10">
    <JoinWorkspaceForm/>
  </div>
}