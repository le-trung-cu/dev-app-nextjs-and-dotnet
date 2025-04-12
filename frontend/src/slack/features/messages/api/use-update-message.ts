import { clients } from "@/lib/clients";
import { useMutation } from "@tanstack/react-query";
import { CreateMessageResponseType } from "../types";
import { toast } from "sonner";

export const useUpdateMessage = () => {
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      messageId,
      body,
    }: {
      workspaceId: string;
      messageId: string;
      body?: string | null;
    }) => {
      const response = await clients.put<CreateMessageResponseType>(
        `/api/slack/workspaces/${workspaceId}/messages/${messageId}`,
        {
          body,
        },
      );

      if (response.data.isSuccess) {
        return response.data.messageId;
      }
      throw new Error("has some error");
    },
    onSuccess: () => {
      toast.success("update message success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
