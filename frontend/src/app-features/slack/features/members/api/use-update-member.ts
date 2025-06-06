import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clients } from "@/lib/clients";
import { MemberRole } from "../types";

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      userId,
      role,
    }: {
      workspaceId: string;
      userId: string;
      role: MemberRole
    }) => {
      const response = await clients.put<{ isSuccess: boolean }>(
        `/api/slack/workspaces/${workspaceId}/members/${userId}`,
        {role},
      );

      if (!response.data?.isSuccess) {
        throw new Error("Failed to update member");
      }

      return response.data.isSuccess;
    },
    onSuccess: (_, { workspaceId, userId }) => {
      toast.success("Role changed");
      queryClient.invalidateQueries({ queryKey: ["members", workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["member", workspaceId, userId] });
    },
    onError: () => {
      toast.error("Failed to update member");
    },
  });

  return mutation;
};
