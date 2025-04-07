import { clients } from "@/lib/clients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      inviteCode,
    }: {
      workspaceId: string;
      inviteCode: string;
    }) => {
      const response = await clients.post<{ isSuccess: boolean }>(
        `/api/slack/join/${workspaceId}`,
        { inviteCode },
      );
      if (!response.data.isSuccess) {
        throw new Error("has some error");
      }
      return response.data.isSuccess;
    },
    onSuccess: (data, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: ["members", workspaceId] });
      toast.success("join workspace success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
