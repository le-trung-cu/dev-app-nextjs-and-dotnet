import { getCurrent, refreshToken } from "@/app-features/auth/actions";
import { redirect } from "next/navigation";
import { ClientWorkspacesPage } from "./client";
import { prefetchWorkspaces } from "@/app-features/jira/features/workspaces/api/use-get-workspaces";
import { QueryClient } from "@tanstack/react-query";

export default async function WorkspacesPage() {
  const current = await getCurrent();
  if(!current) redirect("/login");

  return <ClientWorkspacesPage/>
}
