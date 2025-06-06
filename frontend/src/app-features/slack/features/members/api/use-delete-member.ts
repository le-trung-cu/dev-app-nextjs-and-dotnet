import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clients } from "@/lib/clients";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      userId,
    }: {
      workspaceId: string;
      userId: string;
    }) => {
      const response = await clients.delete<{ isSuccess: boolean }>(
        `/api/slack/workspaces/${workspaceId}/members/${userId}`,
      );

      if (!response.data?.isSuccess) {
        throw new Error("Failed to delete member");
      }

      return response.data.isSuccess;
    },
    onSuccess: (_, { workspaceId }) => {
      toast.success("Member deleted");
      queryClient.invalidateQueries({ queryKey: ["members", workspaceId] });
    },
    onError: () => {
      toast.error("Failed to delete member");
    },
  });

  return mutation;
};
