"use client";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useGetWorkspace } from "../api/use-get-workspace";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { WorkspaceAvatar } from "./workspace-avatar";
import { usePreferencesDialog } from "../hooks/use-preferences-dialog";

export const WorkspaceHeader = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace, isPending } = useGetWorkspace({ workspaceId });
  const  [, setOpenPreference] = usePreferencesDialog();

  if (isPending) {
    return (
      <div className="flex items-center">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="ml-auto size-[30px]" />
      </div>
    );
  }
  if (!workspace) {
    throw new Error("Workspace not found");
  }
  return (
    <header className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            {workspace.name} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div className="flex items-center">
              <WorkspaceAvatar
                name={workspace.name}
                className="mr-2 size-10 shrink-0"
              />
              <div className="">
                <div className="text-xl font-bold">{workspace.name}</div>
                <div className="text-muted-foreground text-xs">
                  Active Workspace
                </div>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Invire peolpe to {workspace.name}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Preferences</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" className="ml-auto">
        <ListFilter className="size-4"/>
      </Button>
      <Button variant="ghost" onClick={() => setOpenPreference(true)}>
        <SquarePen className="size-4"/>
      </Button>
    </header>
  );
};
