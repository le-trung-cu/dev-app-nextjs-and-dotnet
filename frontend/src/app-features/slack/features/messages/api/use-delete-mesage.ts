import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      messageId,
    }: {
      workspaceId: string;
      messageId: string;
    }) => {
      const response = await clients.delete<{ isSuccess: boolean }>(
        `/api/slack/workspaces/${workspaceId}/messages/${messageId}`,
      );
      if (response.data.isSuccess) {
        return "OK";
      }
      throw new Error("has some error");
    },
    onSuccess: (data, { workspaceId }) => {
      toast.success("Update message success");
      queryClient.invalidateQueries({ queryKey: ["messages", workspaceId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
