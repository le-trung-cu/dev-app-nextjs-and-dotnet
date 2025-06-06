import { clients } from "@/lib/clients";
import { useMutation } from "@tanstack/react-query";
import { CreateMessageResponseType } from "../types";
import { toast } from "sonner";

export const useCreateMessage = () => {
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      channelId,
      body,
      image,
      parentMessageId,
      conversationId,
    }: {
      workspaceId: string;
      channelId?: string | null;
      body?: string | null;
      image?: File | null;
      parentMessageId?: string | null;
      conversationId?: string | null;
    }) => {
      const response = await clients.post<CreateMessageResponseType>(
        `/api/slack/workspaces/${workspaceId}/messages`,
        {
          body,
          image,
          parentMessageId,
          conversationId,
          channelId,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.isSuccess) {
        return response.data.messageId;
      }
      throw new Error("has some error");
    },
    onSuccess: () => {
      toast.success("send message success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
