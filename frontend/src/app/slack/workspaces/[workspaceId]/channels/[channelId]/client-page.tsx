"use client";

import { useGetChannel } from "@/app-features/slack/features/channels/api/use-get-channel";
import { ChatInput } from "@/app-features/slack/features/channels/components/chat-input";
import { useChannelId } from "@/app-features/slack/features/channels/hooks/use-channel-id";
import { useGetMessages } from "@/app-features/slack/features/messages/api/use-get-messages";
import { MessageList } from "@/app-features/slack/features/messages/components/mesage-list";
import { useWorkspaceId } from "@/app-features/slack/features/workspaces/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";

export default function ClientPage() {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { data: channel, isLoading: getChannelLoading } = useGetChannel({
    workspaceId,
    channelId,
  });

  const {
    groupedMessages,
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
            data={groupedMessages ?? {}}
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
