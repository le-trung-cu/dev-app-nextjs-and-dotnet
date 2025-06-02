import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clients } from "@/lib/clients";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({workspaceId, taskId} : {workspaceId: string; taskId: string}) => {
      const response = await clients.delete<{isSuccess: boolean}>(`/jira/workspaces/${workspaceId}/tasks/${taskId}`);

      if (!response.data?.isSuccess) {
        throw new Error("Failed to delete task");
      }

      return response.data.isSuccess;
    },
    onSuccess: (_, {workspaceId, taskId}) => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics", workspaceId] });
    },
    onError: () => {
      toast.error("Failed to delete task");
    }
  });

  return mutation;
};
