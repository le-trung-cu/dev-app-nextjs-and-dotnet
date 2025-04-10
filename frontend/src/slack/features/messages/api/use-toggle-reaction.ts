import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleReaction = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      messageId,
      value,
    }: {
      workspaceId: string;
      messageId: string;
      value: string;
    }) => {
      const response = await clients.put<{ isSuccess: boolean }>(
        `/api/slack/workspaces/${workspaceId}/messages/${messageId}/reactions`,
        {
          value,
        },
      );

      if (response.data.isSuccess) {
        return "OK";
      }
      throw new Error("has some error");
    },
    onSuccess: (data, { workspaceId , messageId}) => {
      toast.success("toggle reaction success");
      queryClient.invalidateQueries({ queryKey: ["messages", workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["message", workspaceId, messageId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
