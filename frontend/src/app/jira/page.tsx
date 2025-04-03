import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function JiraPage () {
  const current = await getCurrent();
  if(!current) redirect("/login");
  redirect("/jira/workspaces");
}