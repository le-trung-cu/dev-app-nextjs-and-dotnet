"use client";

import { CircleCheckIcon, House, Settings, Users2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useWorkspaceId } from "../features/workspaces/hooks/use-workspace-id";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavMain() {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menus</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map((item) => {
          const fullPath = item.getFullPath({workspaceId});
          const isActive = pathname === fullPath;

          return (
            <SidebarMenuItem key={item.text}>
              <SidebarMenuButton asChild>
                <Link
                  href={fullPath}
                  className={cn(
                    "flex rounded-lg p-2",
                    isActive && "bg-stone-300/30",
                  )}
                >
                  <item.icon className="mr-2" />
                  {item.text}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
const menuItems = [
  {
    path: "",
    text: "Home",
    icon: House,
    getFullPath: ({ workspaceId }: { workspaceId: string }) =>
      `/jira/workspaces/${workspaceId}`,
  },
  {
    path: "my-tasks",
    text: "My Tasks",
    icon: CircleCheckIcon,
    getFullPath: ({ workspaceId }: { workspaceId: string }) =>
      `/jira/workspaces/${workspaceId}/my-tasks`,
  },
  {
    path: "settings",
    text: "Settings",
    icon: Settings,
    getFullPath: ({ workspaceId }: { workspaceId: string }) =>
      `/jira/workspaces/${workspaceId}/settings`,
  },
  {
    path: "members",
    text: "Members",
    icon: Users2,
    getFullPath: ({ workspaceId }: { workspaceId: string }) =>
      `/jira/workspaces/${workspaceId}/members`,
  },
];
