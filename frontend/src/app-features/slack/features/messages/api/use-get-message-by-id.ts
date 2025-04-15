import { clients } from "@/lib/clients";
import {  useQuery } from "@tanstack/react-query";
import { GetMessageByIdResponseType } from "../types";
import { useGetMembers } from "../../members/api/use-get-members";
import { useMemo, useRef } from "react";
import { Member } from "../../members/types";

export const useGetMessageById = ({
  workspaceId,
  messageId,
}: {
  workspaceId: string;
  messageId?: string | null;
}) => {
  const queryMembers = useGetMembers({ workspaceId });

  const queryMessages = useQuery({
    enabled: !!workspaceId && !!messageId,
    queryKey: ["message", workspaceId, messageId],
    queryFn: async () => {
      const response = await clients.get<GetMessageByIdResponseType>(
        `/api/slack/workspaces/${workspaceId}/messages/${messageId}`,
      );
      if (response.data.isSuccess) {
        return response.data;
      }
      throw new Error("has some error");
    },
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
  const message = useMemo(() => {
    if (!queryMessages.data) return queryMessages.data;

    return {
      ...queryMessages.data.message,
      threads: queryMessages.data.threads,
      reactions: queryMessages.data.reactions,
    };
  }, [queryMessages.data]);

  return {
    message,
    queryMembers,
    queryMessages,
    memberMap,
  };
};
