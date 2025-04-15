import { clients } from "@/lib/clients";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteWorkspace = () => {
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      channelId,
    }: {
      workspaceId: string;
      channelId: string;
    }) => {
      const response = await clients.delete<{ isSucces: boolean }>(
        `/api/slack/workspaces/${workspaceId}/channels/${channelId}`,
      );
      if (!response.data.isSucces) {
        throw new Error("has some error");
      }
    },
    onSuccess: () => {
      toast.success("Delete channel success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
