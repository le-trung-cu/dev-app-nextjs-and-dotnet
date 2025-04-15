"use client";
import { useEffect, useState } from "react";
import { useSignalRMessage } from "../../messages/api/use-signalr-message"
import { useWorkspaceId } from "../hooks/use-workspace-id";

const SignalRComponent1 = () => {
  const workspaceId = useWorkspaceId();
  useSignalRMessage({workspaceId});
  return null;
}

export const SignalRComponent = () => {
  const [mouted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  },[])
  if(!mouted) return null;

  return <SignalRComponent1/>
}