"use client";

import {
  Folder,
  Forward,
  MoreHorizontal,
  PlusCircle,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useGetProjects } from "../api/use-get-projects";
import { ProjectAvatar } from "./project-avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCreateProjectDialog } from "../hooks/use-create-project-dialog";
import { useProjectId } from "../hooks/use-project-id";
import { cn } from "@/lib/utils";

export function NavProjects() {
  const { isMobile } = useSidebar();
  const workspaceId = useWorkspaceId();
  const { data: projects } = useGetProjects({ workspaceId });
  const { open } = useCreateProjectDialog();
  const projectId = useProjectId();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 p-1"
          onClick={open}
        >
          <PlusCircle className="text-muted-foreground size-5" />
        </Button>
      </div>
      <SidebarMenu>
        {projects?.map((item) => {
          const isActive = projectId === item.id;
          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link
                  href={`/jira/workspaces/${workspaceId}/projects/${item.id}`}
                  className={cn(isActive && "bg-stone-300/30")}
                >
                  <ProjectAvatar imgUrl={item.imgUrl} name={item.name} />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
