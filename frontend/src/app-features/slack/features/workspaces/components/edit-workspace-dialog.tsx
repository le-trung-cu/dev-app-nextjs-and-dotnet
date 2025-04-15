"use client";
import { LoaderIcon } from "lucide-react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useGetWorkspace } from "../api/use-get-workspace";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditWorkspaceForm } from "./edit-workspace-form";
import { useEditDialog } from "../hooks/use-edit-dialog";

export const EditWorkspaceDialog = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace, isPending } = useGetWorkspace({ workspaceId });
  const [open, onOpenChange] = useEditDialog();

  console.log("workspace", workspace);

  if (isPending)
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );

  if (!isPending && !workspace) {
    throw Error("Not found workspace");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {isPending ? (
          <>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex min-h-[300px] items-center justify-center">
              <LoaderIcon className="animate-spin" />
            </div>
          </>
        ) : (
          <EditWorkspaceForm initiallValues={workspace!} />
        )}
      </DialogContent>
    </Dialog>
  );
};
