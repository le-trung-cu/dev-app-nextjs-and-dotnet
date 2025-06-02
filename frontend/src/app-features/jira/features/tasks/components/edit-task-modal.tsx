"use client";


import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { ReponsiveDialog } from "@/app-features/jira/components/reponsive-dialog";

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ReponsiveDialog open={!!taskId} onOpenChange={close}>
      {taskId && (
        <EditTaskFormWrapper taskId={taskId} onCancel={close} />
      )}
    </ReponsiveDialog>
  );
};
