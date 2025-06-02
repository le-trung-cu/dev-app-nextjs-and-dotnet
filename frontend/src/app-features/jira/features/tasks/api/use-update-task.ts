import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clients } from "@/lib/clients";
import { z } from "zod";
import { createTaskSchema } from "../types";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Partial<z.infer<typeof createTaskSchema>> & {
      workspaceId: string;
      taskId: string;
      description?: string | null;
    }) => {
      const {workspaceId, taskId, ...task} = data;
      const response = await clients.put<{isSuccess: boolean}>(`/jira/workspaces/${workspaceId}/tasks/${taskId}`, task);

      if (!response.data?.isSuccess) {
        throw new Error("Failed to updated task");
      }

      return response.data.isSuccess;
    },
    onSuccess: (_, {workspaceId, taskId}) => {
      toast.success("Task updated");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics", workspaceId] });
    },
    onError: () => {
      toast.error("Failed to update task");
    }
  });

  return mutation;
};
