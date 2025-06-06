"use client";
import { useEffect, useState } from "react";
import { useSignalRMessage } from "../../messages/api/use-signalr-message";
import { useWorkspaceId } from "../hooks/use-workspace-id";

const SignalRComponent1 = ({ workspaceId }: { workspaceId: string }) => {
  useSignalRMessage({ workspaceId });
  return null;
};

export const SignalRComponent = ({
  workspaceId,
}: {
  workspaceId?: string | null;
}) => {
  const [mouted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mouted || !workspaceId) return null;

  return <SignalRComponent1 workspaceId={workspaceId!} />;
};
