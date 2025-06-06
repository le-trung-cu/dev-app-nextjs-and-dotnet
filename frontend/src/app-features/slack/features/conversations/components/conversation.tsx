import { Loader } from "lucide-react";

import { Header } from "./header";
import { ChatInput } from "./chat-input";
import { useUserId } from "../../members/hooks/use-user-id";
import { usePanel } from "@/app-features/slack/hooks/use-panel";
import { useGetMessages } from "../../messages/api/use-get-messages";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { useParentMessageId } from "../../messages/hooks/use-parent-message-id";
import { useGetMemberById } from "../../members/api/use-get-member-by-id";
import { MessageList } from "../../messages/components/mesage-list";

interface ConversationProps {
  id: string;
}

export const Conversation = ({ id }: ConversationProps) => {
  const userId = useUserId();
  const workspaceId = useWorkspaceId();
  const { onOpenProfile } = usePanel();
  const { data: member, isLoading: memberLoading } = useGetMemberById({
    workspaceId,
    userId,
  });
  const {
    groupedMessages,
    memberMap,
    queryMessages: {
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
    },
  } = useGetMessages({
    workspaceId,
    conversationId: id,
  });

  console.log("groupedMessages", groupedMessages);

  if (memberLoading || isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header
        memberName={member?.name}
        onClick={() => onOpenProfile(member?.userId!)}
      />
      <div className="relative flex-1">
        <div className="absolute inset-0">
          <MessageList
            variant="conversation"
            // memberImage={member?.name}
            memberName={member?.name}
            data={groupedMessages ?? {}}
            loadMore={fetchNextPage}
            isLoadingMore={isFetchingNextPage}
            canLoadMore={!isFetchingNextPage && hasNextPage}
            members={memberMap}
          />
        </div>
      </div>
      <div className="sticky top-0">
        <ChatInput
          placeholder={`Message ${member?.name}`}
          conversationId={id}
        />
      </div>
    </>
  );
};
