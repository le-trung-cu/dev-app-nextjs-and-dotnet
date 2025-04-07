"use client";

import { useGetChannel } from "@/slack/features/channels/api/use-get-channel";
import { ChatInput } from "@/slack/features/channels/components/chat-input";
import { useChannelId } from "@/slack/features/channels/hooks/use-channel-id";
import { useWorkspaceId } from "@/slack/features/workspaces/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";

export default function ClientPage() {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const { data: channel, isLoading: getChannelLoading } = useGetChannel({
    workspaceId,
    channelId,
  });

  const isLoading = getChannelLoading;

  if (isLoading) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
        <TriangleAlert className="text-muted-foreground" />
        <span className="text-muted-foreground text-sm">Channel not found</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <div>Header</div>
      <div className="flex-1"></div>
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
}
