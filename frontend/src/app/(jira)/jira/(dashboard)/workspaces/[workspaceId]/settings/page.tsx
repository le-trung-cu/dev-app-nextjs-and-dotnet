import { refreshToken } from "@/app-features/auth/actions";
import { prefetchWorkspaces } from "@/app-features/jira/features/workspaces/api/use-get-workspaces";
import { EditWorkspaceWraper } from "@/app-features/jira/features/workspaces/components/edit-workspace-wraper";
import { WorkspaceHeaderSettings } from "@/app-features/jira/features/workspaces/components/workspace-header-settings";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const current = await refreshToken();
  if (!current) redirect("/login");

  const queryClient = new QueryClient();
  await prefetchWorkspaces({ queryClient, token: current.token });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <WorkspaceHeaderSettings />
        <div className="mx-auto mt-10 w-full max-w-[800px]">
          <EditWorkspaceWraper />
        </div>
    </HydrationBoundary>
  );
}
