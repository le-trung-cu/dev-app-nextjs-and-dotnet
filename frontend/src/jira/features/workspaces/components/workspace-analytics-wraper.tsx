"use client";
import { Loader } from "lucide-react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useGetWorkspaceAnalytics } from "../api/use-get-workspace-analytics";
import { useGetMembers } from "../../members/api/use-get-members";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceHome } from "./workspace-home";
import { useGetProjects } from "../../projects/api/use-get-projects";

export const WorkspaceHomeWraper = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspaceStatiscal, isPending: isGettingWorkspaceStatiscal } =
    useGetWorkspaceAnalytics({ workspaceId });

  const { data: members, isPending: isGetringMembers } = useGetMembers({
    workspaceId,
  });

  const {data: projects, isPending: isPendingProjects} = useGetProjects({workspaceId});

  if (isGettingWorkspaceStatiscal || isGetringMembers || isPendingProjects) {
    return (
      <div className="h-full flex justify-center items-center min-h-[50vh]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <WorkspaceHeader />
      <div className="px-1 md:px-5">
        <WorkspaceHome
          projects={projects ?? []}
          tasks={workspaceStatiscal!}
          members={members ?? []}
        />
      </div>
    </>
  );
};
