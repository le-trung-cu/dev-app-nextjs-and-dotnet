import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { Member } from "../../members/types";
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id";
import { Message } from "./message";
import { useGetCurrentMember } from "../../members/api/use-get-current-member";
import { ChannelHello } from "./channel-hello";
import { useState } from "react";
import { Loader } from "lucide-react";
import { PaginationMessages } from "../types";

const TIME_THRESHOLD = 5;

type MessageListProps = {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreationTime?: string;
  variant?: "channel" | "thread" | "conversation";
  data: Record<string, PaginationMessages["messages"][number][]>;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
  members: Map<string, Member>;
};

export const MessageList = ({
  memberName,
  memberImage,
  channelName,
  channelCreationTime,
  variant,
  data,
  loadMore,
  isLoadingMore,
  canLoadMore,
  members,
}: MessageListProps) => {
  const workspaceId = useWorkspaceId();
  const [editingId, setEditingId] = useState("");
  const { data: currentMember } = useGetCurrentMember({ workspaceId });
  const groupedMessages = data;
  console.log({groupedMessages})
  return (
    <div className="messages-scrollbar h-full flex flex-1 flex-col-reverse overflow-x-clip overflow-y-auto pb-4 px-5">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => {
        return (
          <div key={dateKey}>
            <div className="relative flex items-center justify-center py-4 text-center">
              <hr className="absolute w-full border-t border-gray-300" />
              <span className="absolute inline-block rounded-full bg-white px-5 py-1 shadow select-none">
                {formatDateLable(dateKey)}
              </span>
            </div>
            {messages.map((item, index) => {
              const author = members.get(item.message.memberId);
              const prevMessage = messages[index - 1];
              const isCompact =
                prevMessage &&
                prevMessage.message.memberId === item.message.memberId &&
                differenceInMinutes(
                  new Date(item.message.createdAt),
                  new Date(prevMessage.message.createdAt),
                ) < TIME_THRESHOLD;
              return (
                <div key={item.message.id}>
                  <Message
                    id={item.message.id}
                    body={item.message.body}
                    createdAt={item.message.createdAt}
                    isCompact={isCompact}
                    authorName={author?.name}
                    isAuthor={item.message.memberId === currentMember?.id}
                    imgUrl={item.message.imgUrl}
                    setEditingId={setEditingId}
                    isEditing={editingId === item.message.id}
                    reactions={item.reactions || []}
                    userId={author?.userId}
                    threadCount={item.threads?.count}
                    threadTimestamp={item.threads?.timestamp}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
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
      {isLoadingMore && (
        <div className="relative flex items-center justify-center py-4 text-center">
          <hr className="absolute w-full border-t border-gray-300" />
          <span className="absolute inline-block rounded-full bg-white px-5 py-1 shadow select-none">
            <Loader className="animate-spin" />
          </span>
        </div>
      )}
      {variant === "channel" && channelName && channelCreationTime && (
        <ChannelHello name={channelName} createdAt={channelCreationTime} />
      )}
    </div>
  );
};

function formatDateLable(dateStr: string) {
  const date = new Date(dateStr);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE, MMM d");
}
