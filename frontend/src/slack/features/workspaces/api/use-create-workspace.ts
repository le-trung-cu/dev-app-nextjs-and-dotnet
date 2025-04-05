import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createWorkspaceSchema } from "../types";
import { clients } from "@/lib/clients";
import { toast } from "sonner";

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof createWorkspaceSchema>) => {
      const response = await clients.post<{ id: string }>(
        "/api/slack/workspaces",
        data
      );
      if (response.data.id) {
        return response.data;
      }
      throw new Error("has some error");
    },
    onSuccess: () => {
      toast.success("Create workspace success");
      queryClient.invalidateQueries({queryKey: ["workspaces"]});
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
