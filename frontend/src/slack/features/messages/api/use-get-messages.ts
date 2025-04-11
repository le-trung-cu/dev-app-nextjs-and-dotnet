import { clients } from "@/lib/clients";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetMessagesResponseType } from "../types";
import { useGetMembers } from "../../members/api/use-get-members";
import { useEffect, useMemo, useRef } from "react";
import { Member } from "../../members/types";

export const useGetMessages = ({
  workspaceId,
  channelId,
  parentMessageId,
}: {
  workspaceId: string;
  channelId?: string;
  parentMessageId?: string|null;
}) => {
  const queryMembers = useGetMembers({ workspaceId });

  const queryMessages = useInfiniteQuery<GetMessagesResponseType>({
    queryKey: ["messages", workspaceId, channelId, parentMessageId],
    initialPageParam: null,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages);
      return lastPage.data.length < lastPage.pageSize? undefined : lastPage.cursor;
    },
    queryFn: async ({ pageParam = 1 }) => {
      const queryArr = [];
      if (channelId) {
        queryArr.push(`channelId=${channelId}`);
      }
      if(parentMessageId) {
        queryArr.push(`parentMessageId=${parentMessageId}`)
      }
      if(pageParam) {
        queryArr.push(`cursor=${pageParam}`);
      }

      let queryString = queryArr.join("&");
      if (queryString.length > 0) {
        queryString += "&";
      }
      const response = await clients.get<GetMessagesResponseType>(
        `/api/slack/workspaces/${workspaceId}/messages?${queryString}&pageSize=${10}`,
      );
      if (response.data.isSuccess) {
        return response.data;
      }
      throw new Error("has some error");
    },
    throwOnError: true,
  });

  const queryMembersRef = useRef(queryMembers);
  queryMembersRef.current = queryMembers;

  const queryMessagesRef = useRef(queryMessages.data);
  queryMessagesRef.current = queryMessages.data;

  const memberMap = useMemo(() => {
    const map = new Map<string, Member>();
    queryMembers.data?.forEach((x) => map.set(x.id, x));
    return map;
  }, [queryMembers.data]);

  useEffect(() => {
    if (!queryMessagesRef.current) return;

    const missing = new Set<string>();
    queryMessagesRef.current.pages.forEach((page) => {
      page.data.forEach((msg) => {
        if (!memberMap.has(msg.memberId)) {
          missing.add(msg.memberId);
        }
      });
    });

    if (missing.size > 0) {
      queryMembersRef.current.refetch();
    }
  }, [
    queryMembersRef.current.data,
    memberMap,
    queryMembersRef.current.refetch,
  ]);

  const allMessages = useMemo(() => {
    return queryMessages.data?.pages.flatMap((page) => {
      const threads = page.threads.reduce(
        (threads, thread) => {
          threads[thread.parentMessageId] = thread;
          return threads;
        },
        {} as Record<string, GetMessagesResponseType["threads"][number]>,
      );

      const reactionCount = page.reactionCounts.reduce(
        (reactionCount, reaction) => {
          if (!reactionCount[reaction.messageId]) {
            reactionCount[reaction.messageId] = [];
          }
          reactionCount[reaction.messageId].push(reaction);
          return reactionCount;
        },
        {} as Record<
          string,
          GetMessagesResponseType["reactionCounts"][number][]
        >,
      );

      return page.data.map((msg) => ({
        ...msg,
        threads: threads[msg.id],
        reactions: reactionCount[msg.id],
      }));
    });
  }, [queryMessages.data]);
  console.log("allMessages", allMessages);
  return {
    allMessages,
    queryMembers,
    queryMessages,
    memberMap,
  };
};
