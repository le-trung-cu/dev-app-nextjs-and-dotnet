"use client";

import { useGetChannel } from "@/slack/features/channels/api/use-get-channel";
import { ChatInput } from "@/slack/features/channels/components/chat-input";
import { useChannelId } from "@/slack/features/channels/hooks/use-channel-id";
import { useGetMessages } from "@/slack/features/messages/api/use-get-messages";
import { MessageList } from "@/slack/features/messages/components/mesage-list";
import { useGetWorkspace } from "@/slack/features/workspaces/api/use-get-workspace";
import { WorkspaceAvatar } from "@/slack/features/workspaces/components/workspace-avatar";
import { useWorkspaceId } from "@/slack/features/workspaces/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";

export default function ClientPage() {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { data: channel, isLoading: getChannelLoading } = useGetChannel({
    workspaceId,
    channelId,
  });

  const {
    allMessages,
    memberMap,
    queryMessages: { fetchNextPage, isFetchingNextPage, hasNextPage },
  } = useGetMessages({
    workspaceId,
    channelId,
  });

  console.log("DDDDD", isFetchingNextPage);

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
      <div className="relative inset-0 flex-1">
        <div className="absolute inset-0">
          <MessageList
            channelName={channel.name}
            channelCreationTime={channel.createdAt}
            data={allMessages ?? []}
            loadMore={fetchNextPage}
            isLoadingMore={isFetchingNextPage}
            canLoadMore={!isFetchingNextPage && hasNextPage}
            members={memberMap}
            variant="channel"
          />
        </div>
      </div>

      <div className="sticky bottom-0">
        <ChatInput placeholder={`Message # ${channel.name}`} />
      </div>
    </div>
  );
}
