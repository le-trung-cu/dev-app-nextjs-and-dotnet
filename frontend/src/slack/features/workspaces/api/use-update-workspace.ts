import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateWorkspaceSchema } from "../types";
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
      data: z.infer<typeof updateWorkspaceSchema>;
    }) => {
      const response = await clients.put<{ isSuccess: boolean }>(
        `/api/slack/workspaces/${workspaceId}`,
        data,
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
