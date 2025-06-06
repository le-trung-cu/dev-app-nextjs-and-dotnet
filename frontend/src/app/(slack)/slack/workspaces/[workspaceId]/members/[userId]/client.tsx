"use client";

import { useGetOrCreateConversation } from "@/app-features/slack/features/conversations/api/use-get-or-create-conversation";
import { Conversation } from "@/app-features/slack/features/conversations/components/conversation";
import { useUserId } from "@/app-features/slack/features/members/hooks/use-user-id";
import { useWorkspaceId } from "@/app-features/slack/features/workspaces/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { useEffect, useState } from "react";

export const MemberIdClient = () => {
  const workspaceId = useWorkspaceId();
  const userId = useUserId();
  const { mutate, isPending } = useGetOrCreateConversation();
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    mutate(
      { workspaceId, userId },
      {
        onSuccess: ({ conversationId }) => {
          setConversationId(conversationId);
        },
      },
    );
  }, []);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }
  if (!conversationId) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <AlertTriangle className="text-muted-foreground size-6" />
        <span className="text-muted-foreground text-sm">
          Conversation not found
        </span>
      </div>
    );
  }
  return <Conversation id={conversationId} />;
};
