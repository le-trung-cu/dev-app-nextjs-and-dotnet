"use client";
import { usePanel } from "@/slack/hooks/use-panel";
import { Message } from "./message";
import { useGetMessageById } from "../api/use-get-message-by-id";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { Loader, TriangleAlert, XIcon } from "lucide-react";
import { useState } from "react";
import { useGetCurrentMember } from "../../members/api/use-get-current-member";
import { Button } from "@/components/ui/button";
import { ThreadInput } from "./thread-input";
import { useGetMessages } from "../api/use-get-messages";
import { format } from "date-fns";
import { MessageMain } from "../types";
import { differenceInMinutes, isToday, isYesterday } from "date-fns";
import { TIME_THRESHOLD } from "../constant";

export const Thread = () => {
  const [editingId, setEditingId] = useState("");
  const { parentMessageId, onClose } = usePanel();
  const workspaceId = useWorkspaceId();
  const { data: currentMember, isLoading: isGetingCurrentMember } =
    useGetCurrentMember({ workspaceId });
  const {
    message,
    memberMap: members,
    queryMessages: { isLoading: isLoadingMessage },
  } = useGetMessageById({ workspaceId, messageId: parentMessageId });

  const {
    allMessages,
    memberMap,
    queryMessages: { fetchNextPage, isFetchingNextPage, hasNextPage },
  } = useGetMessages({ workspaceId, parentMessageId });

  const canLoadMore = !isFetchingNextPage && hasNextPage;
  const loadMore = fetchNextPage;

  const groupedMessages = allMessages?.reduce(
    (groups, message) => {
      const date = new Date(message.createdAt);
      const dateKey = format(date, "yyyy-MM-dd");

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, MessageMain[]>,
  );

  if (!parentMessageId) return null;

  if (isLoadingMessage || isGetingCurrentMember) {
    return (
      <div className="flex size-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <TriangleAlert />
        <p className="text-muted-foreground">Message not found</p>
      </div>
    );
  }

  const author = members.get(message.memberId);
  const isLoadingMore = isFetchingNextPage;
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between border-b p-5">
        <h3 className="text-2xl font-bold">Thread</h3>
        <Button variant="ghost" onClick={onClose}>
          <XIcon className="size-6" />
        </Button>
      </div>
      <div className="relative flex-1">
        <div className="messages-scrollbar absolute inset-0 overflow-y-auto pt-5 flex flex-col-reverse">
          
          {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => {
            return (
              <div key={dateKey}>
                <div className="relative flex items-center justify-center py-4 text-center">
                  <hr className="absolute w-full border-t border-gray-300" />
                  <span className="absolute inline-block rounded-full bg-white px-5 py-1 shadow select-none">
                    {formatDateLable(dateKey)}
                  </span>
                </div>
                {messages.map((message, index) => {
                  const author = members.get(message.memberId);
                  const prevMessage = messages[index - 1];
                  const isCompact =
                    prevMessage &&
                    prevMessage.memberId === message.memberId &&
                    differenceInMinutes(
                      new Date(message.createdAt),
                      new Date(prevMessage.createdAt),
                    ) < TIME_THRESHOLD;
                  return (
                    <div key={message.id}>
                      <Message
                        id={message.id}
                        body={message.body}
                        createdAt={message.createdAt}
                        isCompact={isCompact}
                        authorName={author?.name}
                        isAuthor={message.memberId === currentMember?.id}
                        imgUrl={message.imgUrl}
                        setEditingId={setEditingId}
                        isEditing={editingId === message.id}
                        reactions={message.reactions || []}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
         
          {isLoadingMore && (
            <div className="relative flex items-center justify-center py-4 text-center">
              <hr className="absolute w-full border-t border-gray-300" />
              <span className="absolute inline-block rounded-full bg-white px-5 py-1 shadow select-none">
                <Loader className="animate-spin" />
              </span>
            </div>
          )}
           {!!message && (
            <Message
              id={message.id}
              body={message.body}
              createdAt={message.createdAt}
              isCompact={false}
              authorName={author?.name}
              isAuthor={message.memberId === currentMember?.id}
              imgUrl={message.imgUrl}
              setEditingId={setEditingId}
              isEditing={editingId === message.id}
              reactions={message.reactions || []}
            />
          )}
          <div
            className="h-1"
            ref={(el) => {
              if (el) {
                const observer = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting && canLoadMore) {
                      loadMore();
                    }
                  },
                  { threshold: 1.0 },
                );
                observer.observe(el);

                return () => observer.disconnect();
              }
            }}
          />
          
        </div>
      </div>
      <div className="px-5">
        <ThreadInput placeholder="Reply..." />
      </div>
    </div>
  );
};

function formatDateLable(dateStr: string) {
  const date = new Date(dateStr);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE, MMM d");
}
