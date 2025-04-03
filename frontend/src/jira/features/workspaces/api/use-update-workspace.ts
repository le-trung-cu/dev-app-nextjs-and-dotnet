import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createWorkspaceSchema } from "../types";
import { clients } from "@/lib/clients";
import { toast } from "sonner";

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      data,
    }: {
      workspaceId: string;
      data: z.infer<typeof createWorkspaceSchema>;
    }) => {
      const response = await clients.put<{ isSuccess: boolean }>(
        `/api/jira/workspaces/${workspaceId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (!response.data.isSuccess) throw new Error("Has some error");

      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success("Update workspace success!");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace", variables.workspaceId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
