"use client";
import { useGetWorkspaces } from "@/app-features/jira/features/workspaces/api/use-get-workspaces";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";

export const ClientWorkspacesPage = () => {
  const { data: workspaces, isPending } = useGetWorkspaces();
  if (isPending) {
    return (
      <div className="flex h-full min-h-[500px] w-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (workspaces && workspaces.length > 0) {
    redirect(`/jira/workspaces/${workspaces[0].id}`);
  }

  redirect(`/jira/workspaces/create`);
};
