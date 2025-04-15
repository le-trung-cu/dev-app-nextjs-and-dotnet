"use client";
import { ReponsiveDialog } from "@/app-features/jira/components/reponsive-dialog";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceDialog } from "../hooks/use-create-workspace-dialog";

export const CreateWorkspaceDialog = () => {
  const { isOpen, onOpenChange } = useCreateWorkspaceDialog();
  return (
    <ReponsiveDialog open={isOpen} onOpenChange={onOpenChange}>
      <CreateWorkspaceForm />
    </ReponsiveDialog>
  );
};
