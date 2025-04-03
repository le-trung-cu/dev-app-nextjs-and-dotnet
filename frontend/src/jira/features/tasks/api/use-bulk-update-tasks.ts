import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BulkUpdateTasksRequestType } from "../types";
import { clients } from "@/lib/clients";
import { toast } from "sonner";

export const useBulkUpdateTasks = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      tasks,
    }: {
      workspaceId: string;
      tasks: BulkUpdateTasksRequestType["tasks"];
    }) => {
      const response = await clients.post<{ isSuccess: boolean }>(
        `/api/jira/workspaces/${workspaceId}/tasks/bulk-update`,
        { tasks },
      );
      if (!response.data.isSuccess) {
        throw new Error("Has some error");
      }
      return response.data;
    },
    onSuccess: (data, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics", workspaceId] });
      toast.success("Update tasks success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
