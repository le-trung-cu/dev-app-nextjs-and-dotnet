import { clients } from "@/lib/clients";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useJoinWorkspace = () => {
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      inviteToken,
    }: {
      workspaceId: string;
      inviteToken: string;
    }) => {
      const response = await clients.post<{isSuccess: boolean}>(
        `/api/jira/workspaces/${workspaceId}/join-members/${inviteToken}`
      );

      if(!response.data.isSuccess) {
        throw new Error("Has some error");
      }

      return "ok";
    },
    onSuccess: () => {
      toast.success("Join to workspace success");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
