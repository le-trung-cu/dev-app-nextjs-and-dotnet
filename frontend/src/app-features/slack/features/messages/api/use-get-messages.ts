import { clients } from "@/lib/clients";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetMessagesResponseType, Message, PaginationMessages } from "../types";
import { useGetMembers } from "../../members/api/use-get-members";
import { useEffect, useMemo, useRef } from "react";
import { Member } from "../../members/types";
import { format } from "date-fns";

export const useGetMessages = ({
  workspaceId,
  channelId,
  parentMessageId,
  conversationId,
}: {
  workspaceId: string;
  channelId?: string;
  parentMessageId?: string | null;
  conversationId?: string | null;
}) => {
  const queryMembers = useGetMembers({ workspaceId });

  const queryMessages = useInfiniteQuery<PaginationMessages>({
    queryKey: [
      "messages",
      workspaceId,
      !channelId? null : channelId,
      !parentMessageId? null : parentMessageId,
      !conversationId ? null : conversationId,
    ],
    initialPageParam: null,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.ids.length < lastPage.pageSize
        ? undefined
        : lastPage.cursor;
    },
    queryFn: async ({ pageParam = 1 }): Promise<PaginationMessages> => {
      const queryArr = [];
      if (channelId) {
        queryArr.push(`channelId=${channelId}`);
      }
      if (parentMessageId) {
        queryArr.push(`parentMessageId=${parentMessageId}`);
      }
      if (conversationId) {
        queryArr.push(`conversationId=${conversationId}`);
      }
      if (pageParam) {
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
        const reactionCounts = response.data.reactionCounts.reduce(
          (group, reaction) => {
            if (!group[reaction.messageId]) {
              group[reaction.messageId] = [];
            }
            group[reaction.messageId].push(reaction);
            return group;
          },
          {} as Record<
            Message["id"],
            GetMessagesResponseType["reactionCounts"][number][]
          >,
        );

        const threads = response.data.threads.reduce(
          (group, thread) => {
            group[thread.parentMessageId] = thread;
            return group;
          },
          {} as Record<string, GetMessagesResponseType["threads"][number]>,
        );

        const ids = response.data.data.map((x) => x.id);
        const messages = response.data.data.reduce(
          (group, message) => {
            group[message.id] = {
              message: message,
              reactions: reactionCounts[message.id],
              threads: threads[message.id],
            };
            return group;
          },
          {} as Record<
            Message["id"],
            PaginationMessages["messages"][keyof PaginationMessages["messages"]]
          >,
        );

        return {
          cursor: response.data.cursor,
          pageSize: response.data.pageSize,
          ids,
          messages,
        };
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

    const memberIds = queryMessagesRef.current.pages.flatMap((page) => {
      return Object.entries(page.messages).map(
        ([, message]) => message.message.memberId,
      );
    });
    const memberSet = new Set(memberIds);

    const missing = memberSet.difference(new Set(memberMap.keys()));

    if (missing.size > 0) {
      queryMembersRef.current.refetch();
    }
  }, [
    queryMembersRef.current.data,
    memberMap,
    queryMembersRef.current.refetch,
  ]);

  // const allMessages = useMemo(() => {
  //   return queryMessages.data?.pages.flatMap((page) => {
  //    return page.ids.map(id => page.messages[id]);
  //   });
  // }, [queryMessages.data]);

  const groupedMessages = useMemo(() => {
    return queryMessages.data?.pages.reduce(
      (group, page) => {
        page.ids.forEach((id) => {
          const date = new Date(page.messages[id].message.createdAt);
          const dateKey = format(date, "yyyy-MM-dd");
          if (!group[dateKey]) {
            group[dateKey] = [];
          }
          group[dateKey].unshift(page.messages[id]);
        });
        return group;
      },
      {} as Record<string, PaginationMessages["messages"][number][]>,
    );
  }, [queryMessages.data]);

  // console.log("allMessages", allMessages);
  return {
    groupedMessages,
    queryMembers,
    queryMessages,
    memberMap,
  };
};
