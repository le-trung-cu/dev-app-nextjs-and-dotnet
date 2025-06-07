"use client";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { createSignalRContext } from "react-signalr";
import { useWorkspaceId } from "../features/workspaces/hooks/use-workspace-id";
import { useEffect, useState } from "react";
import { SignalRComponent } from "../features/workspaces/components/signalr-component";

const SignalRContext = createSignalRContext();

export const SignalRProvider = ({
  token,
  children,
}: {
  token?: string;
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);
  const workspaceId = useWorkspaceId();


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return children;

  return (
    <SignalRContext.Provider
      connectEnabled={!!token && !!workspaceId && mounted}
      accessTokenFactory={() => token ?? ""}
      dependencies={[token, workspaceId]}
      url={`${NEXT_PUBLIC_API_HOST_ADDRESS}/slack/chat/hubs?workspaceId=${workspaceId}`}
    >
      {children}
      <SignalRComponent workspaceId={workspaceId}/>
    </SignalRContext.Provider>
  );
};

export const useSignalREffect = SignalRContext.useSignalREffect;
