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
    }: {
      workspaceId: string;
      channelId: string;
      body?: string | null;
      image?: File | null;
    }) => {
      debugger;
      const response = await clients.post<CreateMessageResponseType>(
        `/api/slack/workspaces/${workspaceId}/channels/${channelId}/messages`,
        {
          body,

          image,
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
