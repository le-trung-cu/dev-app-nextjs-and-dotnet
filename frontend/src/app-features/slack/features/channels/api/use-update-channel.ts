import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { clients } from "@/lib/clients";
import { toast } from "sonner";
import { createChannelSchema } from "../types";

export const useUpdateChannel = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      workspaceId,
      channelId,
      data,
    }: {
      workspaceId: string;
      channelId: string;
      data: z.infer<typeof createChannelSchema>;
    }) => {
      const response = await clients.post<{
        isSuccess: boolean;
        channelId: string;
      }>(`/api/slack/workspaces/${workspaceId}/channels/${channelId}`, data);
      if (response.data.isSuccess) {
        return response.data;
      }
      throw new Error("has some error");
    },
    onSuccess: (data, { workspaceId, channelId }) => {
      toast.success("Update channel success");
      queryClient.invalidateQueries({ queryKey: ["channels", workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["channel", channelId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
