"use client";
import { useEffect, useState } from "react";
import { CreateWorkspaceDialog } from "../features/workspaces/components/create-workspace-dialog";
import { CreateProjectDialog } from "../features/projects/components/create-project-dialog";
import { CreateTaskDialog } from "../features/tasks/components/create-task-dialog";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <>
      <CreateWorkspaceDialog />
      <CreateProjectDialog />
      <CreateTaskDialog/>
    </>
  );
};
