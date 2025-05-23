"use client";
import { ReponsiveDialog } from "@/app-features/jira/components/reponsive-dialog";
import { CreateProjectForm } from "./create-project-form";
import { useCreateProjectDialog } from "../hooks/use-create-project-dialog";

export const CreateProjectDialog = () => {
  const { isOpen, onOpenChange } = useCreateProjectDialog();
  return (
    <ReponsiveDialog open={isOpen} onOpenChange={onOpenChange}>
      <CreateProjectForm />
    </ReponsiveDialog>
  );
};
