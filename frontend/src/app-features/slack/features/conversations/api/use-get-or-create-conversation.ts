import { clients } from "@/lib/clients";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetOrCreateConversation = () => {
  const query = useMutation({
    mutationFn: async ({
      workspaceId,
      userId,
    }: {
      workspaceId: string;
      userId: string;
    }) => {
      const response = await clients.put<{
        isSuccess: boolean;
        conversationId: string;
      }>(`/api/slack/workspaces/${workspaceId}/converations`, {
        userId,
      });
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }

      return { conversationId: response.data.conversationId };
    },
  });

  return query;
};
