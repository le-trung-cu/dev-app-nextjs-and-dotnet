import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useResetInviteToken = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ workspaceId }: { workspaceId: string }) => {
      const response = await clients.put<{ isSuccess: boolean }>(
        `/api/slack/workspaces/${workspaceId}/invite-token`,
      );
      if (!response.data.isSuccess) {
        throw new Error("Has some error");
      }
      return "ok";
    },
    onSuccess: () => {
      toast.success("update invite token success");
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
