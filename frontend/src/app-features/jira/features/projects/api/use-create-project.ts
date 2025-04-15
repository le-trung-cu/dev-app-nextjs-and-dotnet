import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createProjectSchema } from "../types";
import { clients } from "@/lib/clients";
import { toast } from "sonner";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      data,
    }: {
      workspaceId: string;
      data: z.infer<typeof createProjectSchema>;
    }) => {
      const response = await clients.post<{ isSuccess: boolean }>(
        `/api/jira/workspaces/${workspaceId}/projects`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (response.data.isSuccess) {
        return response.data;
      }
      throw new Error("has some error");
    },
    onSuccess: (data, { workspaceId }) => {
      toast.success("Create project success");
      queryClient.invalidateQueries({ queryKey: ["projects", workspaceId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
