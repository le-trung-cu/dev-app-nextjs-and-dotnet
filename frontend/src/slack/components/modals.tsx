"use client";
import { useEffect, useState } from "react";
import { CreateWorkspaceDialog } from "../features/workspaces/components/create-workspace-dialog";
import { PreferencesDialog } from "../features/workspaces/components/preferences-dialog";
import { EditWorkspaceDialog } from "../features/workspaces/components/edit-workspace-dialog";
import { useWorkspaceId } from "../features/workspaces/hooks/use-workspace-id";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);
  const workspaceId = useWorkspaceId();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <>
      <CreateWorkspaceDialog />
      {workspaceId && (
        <>
          <PreferencesDialog />
          <EditWorkspaceDialog />
        </>
      )}
    </>
  );
};
