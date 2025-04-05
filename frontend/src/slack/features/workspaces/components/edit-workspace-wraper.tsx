"use client";
import { LoaderIcon } from "lucide-react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { EditWorkspaceForm } from "./edit-workspace-form";
import { useGetWorkspace } from "../api/use-get-workspace";

export const EditWorkspaceWraper = () => {
  const workspaceId = useWorkspaceId();
  const {
    data: workspace,
    isPending,
    isSuccess,
  } = useGetWorkspace({ workspaceId });
  console.log("workspace", workspace);

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
