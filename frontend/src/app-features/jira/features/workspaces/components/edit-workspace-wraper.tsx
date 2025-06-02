"use client";
import { LoaderIcon } from "lucide-react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { EditWorkspaceForm } from "./edit-workspace-form";
import { useGetWorkspaceById } from "../api/use-get-workspace-by-id";

export const EditWorkspaceWraper = () => {
  const workspaceId = useWorkspaceId();
  const {
    data: workspace,
    isPending,
    isSuccess,
  } = useGetWorkspaceById({ workspaceId });

  if (isPending)
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );

  if (!workspace) {
    throw Error("Not found workspace");
  }

  if (!isPending && isSuccess) {
    return <EditWorkspaceForm initialValues={{ ...workspace }} />;
  }
};
