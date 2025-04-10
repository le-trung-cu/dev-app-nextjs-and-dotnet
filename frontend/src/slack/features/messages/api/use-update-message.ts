import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMessageResponseType } from "../types";
import { toast } from "sonner";

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();
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
    onSuccess: (data, { workspaceId }) => {
      toast.success("update message success");
      queryClient.invalidateQueries({ queryKey: ["messages", workspaceId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
