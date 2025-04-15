"use client";
import { ReponsiveDialog } from "@/app-features/jira/components/reponsive-dialog";
import { CreateTaskFormWraper } from "./create-task-form-wraper";
import { useCreateTaskDialog } from "../hooks/use-create-task-dialog";

export const CreateTaskDialog = () => {
  const { isOpen, onOpenChange } = useCreateTaskDialog();
  return (
    <ReponsiveDialog open={isOpen} onOpenChange={onOpenChange}>
      <CreateTaskFormWraper />
    </ReponsiveDialog>
  );
};
