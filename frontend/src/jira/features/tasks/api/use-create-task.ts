import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { clients } from "@/lib/clients";
import { toast } from "sonner";
import { createTaskSchema } from "../types";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      data,
    }: {
      workspaceId: string;
      data: z.infer<typeof createTaskSchema>;
    }) => {
      const response = await clients.post<{ isSuccess: boolean }>(
        `/api/jira/workspaces/${workspaceId}/tasks`,
        data,
      );
      if (response.data.isSuccess) {
        return response.data;
      }
      throw new Error("has some error");
    },
    onSuccess: (data, { workspaceId }) => {
      toast.success("Create task success");
      queryClient.invalidateQueries({ queryKey: ["tasks", workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics", workspaceId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
