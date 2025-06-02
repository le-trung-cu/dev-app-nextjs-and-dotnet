import { AppSidebar } from "@/app-features/jira/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Modals } from "@/app-features/jira/components/modals";
import { refreshToken } from "@/app-features/auth/actions";
import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchWorkspaces } from "@/app-features/jira/features/workspaces/api/use-get-workspaces";
import { prefetchProjects } from "@/app-features/jira/features/projects/api/use-get-projects";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    workspaceId: string;
  }>;
}) {
  const { workspaceId } = await params;
  const current = await refreshToken();
  if (!current) redirect("/login");
  const queryClient = new QueryClient();
  const f1 = prefetchWorkspaces({
    queryClient,
    token: current.token,
  });
  const f2 = prefetchProjects({
    queryClient,
    token: current.token,
    workspaceId,
  });
  await Promise.all([f1, f2]);
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Suspense>
              {children}
            </Suspense>
          </div>
        </SidebarInset>
        <Modals />
      </SidebarProvider>
    </HydrationBoundary>
  );
}
