"use client";
import { useEffect, useState } from "react";
import { PreferencesDialog } from "../features/workspaces/components/preferences-dialog";
import { EditWorkspaceDialog } from "../features/workspaces/components/edit-workspace-dialog";
import { CreateChanelDialog } from "../features/channels/components/create-channel-dialog";

export const ModalsWorkspaceId = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <>
      <PreferencesDialog />
      <EditWorkspaceDialog />
      <CreateChanelDialog />
    </>
  );
};
