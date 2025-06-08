import React from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayour({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarProvider>{children}</SidebarProvider>
    </SidebarProvider>
  );
}
