import { AppSidebar } from "@/app-features/slack/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ModalsWorkspaceId } from "@/app-features/slack/components/modals-workspace-id";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ThreadPanel } from "@/app-features/slack/features/messages/components/thread-panel";
import { Toolbar } from "@/app-features/slack/components/toolbar";
import { SignalRProvider } from "@/app-features/slack/components/signalr-provider";
import { getCurrent } from "@/app-features/auth/actions";

export default async function WorkspaceIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = await getCurrent();
  return (
    <div>
      <div className="bg-appbar z-50 flex h-[52px] items-center sticky top-0">
        <div className="flex-1">
          <Toolbar />
        </div>
      </div>

      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
        className="min-h-[calc(100svh-52px)]"
      >
        <AppSidebar />

        <SidebarInset>
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={65}>
              <div className="flex h-full flex-col">{children}</div>
            </ResizablePanel>
            <ThreadPanel />
          </ResizablePanelGroup>
        </SidebarInset>
      </SidebarProvider>
      <ModalsWorkspaceId />
    </div>
  );
}
